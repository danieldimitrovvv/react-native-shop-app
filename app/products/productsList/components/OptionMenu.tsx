import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// components
import { View, Alert, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Menu } from "react-native-paper";

//  models
import ProductModel from "../../../../models/db/ProductModel/ProductModel";

// styles
import { containerStyles } from "../../../../styles/main";
import palette, { primaryColor, white } from "../../../../styles/colors";

// types
import RootStackParamList from "../../../../types/RootStackParamListTypes";

// hooks
import usePublishProductHook from "../../../../hooks/products/publishProductHook";
import useConvertProductImagesHook from "../../../../hooks/products/convertProductImagesHook";
import useDeleteProductHook from "../../../../hooks/products/deleteProductHook";
import RolesTypes from "../../../../models/types/RolesTypes";
import { useSettingsState } from "../../../../store/slices/settings/settingsSlice";
import LeftDrawerStackParamList from "../../../../types/LeftDrawerStackParamListTypes";

type OptionMenuProps = {
  product: ProductModel;
  updatedProduct: (product: ProductModel | null) => void;
  deleteProductCallback: (product: ProductModel) => void;
};

const OptionMenu = ({
  product,
  updatedProduct,
  deleteProductCallback,
}: OptionMenuProps) => {
  const { t } = useTranslation();

  const settingsState = useSettingsState();

  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList & LeftDrawerStackParamList>
    >();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const {
    isLoading: isLoadingPublish,
    error: errorPublish,
    product: productAfterPublish,
    publish,
  } = usePublishProductHook(product.id);

  const {
    isLoading: deleteIsLoading,
    error: deleteError,
    effectedRows,
    deleteProduct,
  } = useDeleteProductHook();

  const {
    isLoading: convertImagesIsLoading,
    error: convertImagesError,
    product: productWithConvertImages,
    convertImages,
  } = useConvertProductImagesHook(product.id);

  const [row, setRow] = React.useState<ProductModel | null>(product);

  function onPressPreviewHandel() {
    navigation.navigate("ProductDetails", { id: product.id.toString() });
    closeMenu();
  }

  function onPressEditHandel() {
    navigation.navigate("AddProduct", { id: product.id.toString() });
    closeMenu();
  }

  function onPublishHandel() {
    publish(!row?.isPublish);
    closeMenu();
  }

  function onConvertImageHandel() {
    convertImages();
    closeMenu();
  }

  function onDeleteHandel() {
    deleteProduct(product.id);
    closeMenu();
  }

  React.useEffect(() => {
    setRow(product);
  }, [product]);

  React.useEffect(() => {
    if (productAfterPublish) {
      setRow((prevState) => {
        return prevState
          ? {
              ...prevState,
              isPublish: productAfterPublish.isPublish,
            }
          : productAfterPublish;
      });
    }
  }, [productAfterPublish]);

  React.useEffect(() => {
    if (productWithConvertImages) {
      setRow((prevState) => {
        return prevState
          ? {
              ...prevState,
              images: productWithConvertImages.images,
            }
          : productWithConvertImages;
      });
    }
  }, [productWithConvertImages]);

  React.useEffect(() => {
    if (effectedRows > 0) {
      setRow(null);
      if (row) {
        deleteProductCallback(row);
      }
    }
  }, [effectedRows, row]);

  React.useEffect(() => {
    updatedProduct(row);
  }, [row]);

  function ErrorLabel({ message }: { message: string }) {
    return <Text style={{ color: palette.error.main.value }}>{message}</Text>;
  }

  const anchor = (
    <Icon
      color={palette.primary.light.value}
      type="font-awesome"
      name="ellipsis-v"
      onPress={openMenu}
      size={15}
      reverse
    />
  );

  const iconProps = {
    type: "font-awesome",
    size: 15,
    color: white,
    style: { marginRight: 5 },
  };

  if (!row) {
    return <></>;
  }

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
        <View
          style={{
            ...containerStyles.containerColumn,
            padding: 5,
            gap: 5,
            alignItems: "stretch",
          }}
        >
          <Button
            title={t("COMMON.PREVIEW")}
            onPress={onPressPreviewHandel}
            icon={<Icon name="preview" {...iconProps} type="material-icons" />}
          />

          <Button
            title={t("COMMON.EDIT")}
            onPress={onPressEditHandel}
            icon={<Icon name="edit" {...iconProps} type="material-icons" />}
          />

          <Button
            title={
              errorPublish ? (
                <ErrorLabel message={errorPublish} />
              ) : row.isPublish ? (
                t("MODELS.PRODUCT.UNPUBLISH")
              ) : (
                t("MODELS.PRODUCT.PUBLISH")
              )
            }
            loading={isLoadingPublish}
            onPress={onPublishHandel}
            icon={
              <Icon
                name={row.isPublish ? "visibility-off" : "visibility"}
                {...iconProps}
                type="material-icons"
              />
            }
          />

          {row.images.find((i) => i.url.includes(";base64,")) &&
            settingsState.isAuthenticate &&
            [RolesTypes.ADMIN, RolesTypes.TECHNICIAN].includes(
              settingsState.loginUser?.role ?? RolesTypes.UNKNOWN
            ) && (
              <Button
                title={
                  convertImagesError ? (
                    <ErrorLabel message={convertImagesError} />
                  ) : (
                    t("COMMON.CONVERT_IMAGES")
                  )
                }
                loading={convertImagesIsLoading}
                onPress={onConvertImageHandel}
                icon={<Icon name="sync" {...iconProps} type="material-icons" />}
              />
            )}

          <Button
            title={
              deleteError ? (
                <ErrorLabel message={deleteError} />
              ) : (
                t("COMMON.DELETE")
              )
            }
            loading={deleteIsLoading}
            onPress={onDeleteHandel}
            icon={
              <Icon
                name="trash"
                {...iconProps}
                color={palette.error.light.value}
              />
            }
          />
        </View>
      </Menu>
    </View>
  );
};

export default OptionMenu;
