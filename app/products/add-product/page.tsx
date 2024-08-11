import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// models
import IProductImageModel from "../../../models/db/ProductImageModel/IProductImageModel";
import IProductModel from "../../../models/db/ProductModel/IProductModel";

//  types
import { ProductCurrencyCodeTypes } from "../../../models/types/ProductCurrencyCodeTypes";
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";
import { ProductCategoryTypes } from "../../../models/types/ProductCategoryTypes";
import { ProductBrandTypes } from "../../../models/types/ProductBrandTypes";

//  hooks
import useGetProductHook from "../../../hooks/products/getProductHook";
import useCreateUpdateProductHook from "../../../hooks/products/createUpdateProductHook";

// styles
import palette, {
  greyColor,
  primaryColor,
  successColor,
} from "../../../styles/colors";
import { containerStyles } from "../../../styles/main";
import { shadowsStyles } from "../../../styles/shadows";
import { formStyles } from "../../../styles/form";

// store
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";

//  utilities
import UrlsUtility from "../../../utilities/UrlsUtility";

// components
import { ActivityIndicator, Text, View } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import ErrorMessage from "../../../components/messages/ErrorMessage";

// routes
import { NavigationProp, useNavigation } from "@react-navigation/native";
import RootStackHeaderTitle from "../../../routes/RootStackHeaderTitle";

import { ScrollView } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import { FormUploadImageProps } from "./components/PickImagesItem";
import CreateInput from "../../../components/form/CreateInput";
import PickImages from "./components/PickImages";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "AddProduct">;

const AddProductScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const navigator = useNavigation<NavigationProp<LeftDrawerStackParamList>>();

  const settingsState = useSettingsState();

  const editProductId = route.params?.id
    ? parseInt(route.params?.id ?? "0")
    : undefined;

  const {
    isLoading: isLoadingEditProduct,
    error: errorEditProduct,
    product: editProduct,
    clearProduct: clearEditProduct,
  } = useGetProductHook(editProductId);

  const { isLoading, error, createUpdateProduct, product, clearProduct } =
    useCreateUpdateProductHook(editProduct?.id ?? 0);

  function initState(state?: IProductModel | null) {
    return {
      title: {
        value: state?.title ?? "",
        isValid: (state?.title && state?.title?.length > 0) || false,
      },
      description: { value: state?.description ?? "", isValid: true },
      brand: {
        value: state?.brand ?? ProductBrandTypes.UNKNOWN,
        isValid: state?.brand !== ProductBrandTypes.UNKNOWN,
      },
      price: {
        value: state?.price ?? "0.0",
        isValid: (state?.price && state?.price >= 0) || true,
      },
      amount: {
        value: state?.amount ?? "1",
        isValid: (state?.amount && state?.amount >= 0) || true,
      },
      category: {
        value: state?.category ?? ProductCategoryTypes.UNKNOWN,
        isValid: state?.category !== ProductCategoryTypes.UNKNOWN,
      },
    };
  }
  const [state, setState] = React.useState(
    initState(editProduct ?? ({} as IProductModel))
  );

  const [images, setImages] = React.useState<IProductImageModel[]>(
    editProduct?.images ?? []
  );

  const [redirectTimeout, setRedirectTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  function clearState() {
    setState(initState({} as IProductModel));
    setImages([]);
    clearEditProduct();
    clearProduct();
  }

  function onChangeInputHandler({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) {
    setState((prevState) => ({
      ...prevState,
      [name]: { value, isValid: value },
    }));
  }

  const handelOnAddUploadImage = (image: FormUploadImageProps) => {
    setImages((prevState) => {
      if (prevState.length === 0) {
        return [
          {
            id: image.id ?? 0,
            url: image.url,
            isMain: true,
          },
        ];
      }

      const newState = [...prevState];
      const existImg = newState.find((img) => img.url === image.url);
      const existMain = newState?.map((i) => i.isMain).some((i) => i);

      if (!existImg) {
        newState.push({
          id: image.id ?? 0,
          url: image.url,
          isMain: existMain ? false : true,
        });
      }

      return newState;
    });
  };

  const handelOnCheckUploadImage = (image: FormUploadImageProps) => {
    const searchItemIndex = images?.findIndex((i) => i.url === image.url) ?? -1;

    if (searchItemIndex !== -1) {
      const updatedPreviewImages = images ? [...images] : [];

      // remove main image
      updatedPreviewImages.forEach((i) => {
        i.isMain = false;
      });

      const mainImg = updatedPreviewImages[searchItemIndex];
      mainImg.isMain = image.isCheck;

      if (!image.isCheck) {
        updatedPreviewImages[0].isMain = true;
      }

      setImages(updatedPreviewImages);
    }
  };

  const handelOnDeleteUploadImage = (image: FormUploadImageProps) => {
    const deleteIndex = images?.findIndex((i) => i.url === image.url) ?? -1;

    if (deleteIndex !== -1) {
      const updatedPreviewImages = images ? [...images] : [];
      updatedPreviewImages.splice(deleteIndex, 1);

      if (image.isCheck && updatedPreviewImages.length > 0) {
        //if delete main img set first element to main
        updatedPreviewImages[0].isMain = true;
      }

      setImages(updatedPreviewImages);
    }
  };

  async function handleOnSubmit() {
    const requestData = {
      title: state.title.value,
      description: state.description.value,
      price:
        typeof state.price.value === "string"
          ? parseFloat(state.price.value)
          : state.price.value,
      amount:
        typeof state.amount.value === "string"
          ? parseInt(state.amount.value)
          : state.amount.value,
      brand: state.brand.value,
      category: state.category.value,
      images: images,
      currencyCode: ProductCurrencyCodeTypes.BGN,
      discountPercentage: 0,
      discountPrice: 0,
      thumbnail: "",
      id: 0,
    };

    await createUpdateProduct(requestData);

    const timeout = setTimeout(() => {
      // clear state
      clearState();
      navigator.navigate("ProductsList", {
        refreshTimeStamp: new Date().getMilliseconds(),
      });
    }, settingsState.settings.autoRedirect);

    setRedirectTimeout(timeout);
  }

  const [mainImage, setMainImage] = React.useState<string>(
    UrlsUtility.getImageBaseURL() + "/" + editProduct?.getMainImg()
  );

  React.useEffect(() => {
    if (editProduct) {
      setMainImage(
        UrlsUtility.getImageBaseURL() + "/" + editProduct?.getMainImg()
      );
      setImages(editProduct.images);

      navigation.setOptions({
        headerTitle: (props) => (
          <RootStackHeaderTitle
            title={editProduct?.title ?? ""}
            titleProps={{
              style: { fontSize: 18, color: palette.primary.main.value },
            }}
          />
        ),
      });

      setState(initState(editProduct));
    }
  }, [editProduct]);

  React.useEffect(() => {
    return () => {
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [redirectTimeout]);

  React.useEffect(() => {
    if (!route.params?.id) {
      clearEditProduct();
    }
  }, [route.params]);
  const categoryDropdownData = [
    ...Object.keys(ProductCategoryTypes)
      .filter((k) => k !== ProductCategoryTypes[ProductCategoryTypes.UNKNOWN])
      .map((key) => ({
        title: t("ENUMS.PRODUCT_CATEGORY_TYPES." + key.toUpperCase()),
        key,
      })),
  ];

  const brandDropdownData = [
    ...Object.keys(ProductBrandTypes)
      .filter((k) => k !== ProductBrandTypes[ProductBrandTypes.UNKNOWN])
      .map((key) => ({
        title: t("ENUMS.PRODUCT_BRAND_TYPES." + key.toUpperCase()),
        key,
      })),
  ];

  const disableSubmitButton = React.useMemo(
    () => !state.title.value || !state.amount.value || !state.price.value,
    [state]
  );

  return (
    <ScrollView
      style={{
        ...formStyles.container,
        paddingBottom: 20,
      }}
    >
      {error && <ErrorMessage message={error} />}
      {isLoading && <ActivityIndicator />}

      {!isLoading && product && (
        <View>
          <Text style={formStyles.title}>
            {product.title} - {product.price}
          </Text>
          <Text
            style={{
              backgroundColor: successColor.main.value,
              color: successColor.main.contrastText,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {t("FORMS.PRODUCT.MESSAGES.ADDED_NOT_SUCCESSFULLY")}
          </Text>

          <View style={{ ...formStyles.buttonView, marginBottom: 10 }}>
            <Button
              onPress={() => {
                clearState();
                if (redirectTimeout) clearTimeout(redirectTimeout);
                navigation.navigate("AddProduct", { id: undefined });
              }}
              title={t(`FORMS.PRODUCT.ADD_PRODUCT`).toUpperCase()}
              icon={<Icon name="add" type="material-icons" color={"#fff"} />}
            />
          </View>
        </View>
      )}

      {!isLoading && !product && (
        <>
          <View
            style={{
              ...containerStyles.containerRowCenter,
              marginBottom: 10,
            }}
          >
            {editProduct && editProduct.images.length > 0 && (
              <View style={{ ...shadowsStyles.xxxl }}>
                <Image
                  source={{ uri: mainImage }}
                  style={{
                    width: 100,
                    height: "100%",
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: primaryColor.main.value,
                  }}
                  resizeMode="cover"
                />
              </View>
            )}

            <Text style={{ ...formStyles.title, flex: 1, flexWrap: "wrap" }}>
              {t(
                `FORMS.PRODUCT.${!editProduct ? "ADD_PRODUCT" : "EDIT_PRODUCT"}`
              )}
            </Text>
          </View>

          <View style={formStyles.inputView}>
            <CreateInput
              placeholder={t("FORMS.PRODUCT.TITLE")}
              value={state.title.value}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "title", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.PRODUCT.PRICE")}
              value={state.price.value.toString()}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "price", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.PRODUCT.AMOUNT")}
              value={state.amount.value.toString()}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "amount", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.PRODUCT.DESCRIPTION")}
              value={state.description.value.toString()}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "description", value: text })
              }
            />

            <SelectDropdown
              data={categoryDropdownData}
              onSelect={(selectedItem, index) => {
                onChangeInputHandler({
                  name: "category",
                  value:
                    ProductCategoryTypes[
                      selectedItem.key as keyof typeof ProductCategoryTypes
                    ],
                });
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View
                    style={{
                      ...formStyles.dropdownButtonStyle,
                      width: "100%",
                    }}
                  >
                    <Text style={formStyles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) ||
                        t("FORMS.PRODUCT.MESSAGES.SELECT_CATEGORY")}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...formStyles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    }}
                  >
                    <Text style={formStyles.dropdownItemTxtStyle}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={true}
              dropdownStyle={formStyles.dropdownMenuStyle}
              defaultValueByIndex={categoryDropdownData.findIndex(
                (c) => c.key === state.category.value.toUpperCase()
              )}
            />

            <SelectDropdown
              data={brandDropdownData}
              onSelect={(selectedItem, index) => {
                onChangeInputHandler({
                  name: "brand",
                  value:
                    ProductBrandTypes[
                      selectedItem.key as keyof typeof ProductBrandTypes
                    ],
                });
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View
                    style={{
                      ...formStyles.dropdownButtonStyle,
                      width: "100%",
                    }}
                  >
                    <Text style={formStyles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) ||
                        t("FORMS.PRODUCT.MESSAGES.SELECT_BRAND")}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...formStyles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    }}
                  >
                    <Text style={formStyles.dropdownItemTxtStyle}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={formStyles.dropdownMenuStyle}
              defaultValueByIndex={brandDropdownData.findIndex(
                (c) => c.key === state.brand.value.toUpperCase()
              )}
            />

            <PickImages
              size={120}
              images={images.map((i) => ({ ...i, isCheck: i.isMain }))}
              onAdd={handelOnAddUploadImage}
              onDelete={handelOnDeleteUploadImage}
              onCheck={handelOnCheckUploadImage}
              multiple
            />
          </View>

          <View style={{ ...formStyles.buttonView, marginBottom: 30 }}>
            <Button
              onPress={handleOnSubmit}
              title={t(
                `FORMS.PRODUCT.${!editProduct ? "ADD_PRODUCT" : "EDIT_PRODUCT"}`
              ).toUpperCase()}
              icon={
                <Icon
                  name={!editProduct ? "add" : "edit"}
                  type="material-icons"
                  color={disableSubmitButton ? greyColor.main.value : "#fff"}
                />
              }
              disabled={disableSubmitButton}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default AddProductScreen;
