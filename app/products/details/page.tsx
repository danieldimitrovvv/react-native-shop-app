import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// models
import IProductModel from "../../../models/db/ProductModel/IProductModel";

//  types
import RootStackParamList from "../../../types/RootStackParamListTypes";

//  hooks
import useGetProductHook from "../../../hooks/products/getProductHook";

// styles
import { shadowsStyles } from "../../../styles/shadows";
import palette from "../../../styles/colors";

// store
import { useDispatch } from "react-redux";
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";
import {
  addShoppingCartItem,
  setShoppingCartInquiryItem,
} from "../../../store/slices/shopping-cart/shoppingCartSlice";

//  utilities
import UrlsUtility from "../../../utilities/UrlsUtility";

// components
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { Badge, Button, Card, Icon } from "react-native-elements";
import ErrorMessage from "../../../components/messages/ErrorMessage";

import RootStackHeaderTitle from "../../../routes/RootStackHeaderTitle";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

const ProductDetailsScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const settingsState = useSettingsState();

  const { isLoading, error, product } = useGetProductHook(
    parseInt(route.params.id)
  );

  const [mainImage, setMainImage] = React.useState<string>(
    UrlsUtility.getImageBaseURL() + "/" + product?.getMainImg()
  );

  function OnPressAddHandler() {
    dispatch(
      addShoppingCartItem({
        product: JSON.parse(JSON.stringify(product)) as IProductModel,
        settings: settingsState.settings,
      })
    );
  }

  function OnPressOrderHandler() {
    if (product) {
      dispatch(
        setShoppingCartInquiryItem(
          JSON.parse(JSON.stringify(product)) as IProductModel
        )
      );

      // navigate to order form
      navigation.navigate("FinishOrder");
    }
  }

  React.useEffect(() => {
    if (product) {
      setMainImage(UrlsUtility.getImageBaseURL() + "/" + product?.getMainImg());
      navigation.setOptions({
        headerTitle: (props) => (
          <RootStackHeaderTitle
            title={product.title}
            titleProps={{
              style: { fontSize: 18, color: palette.primary.main.value },
            }}
          />
        ),
      });
    }
  }, [product]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {error && <ErrorMessage message={error} />}
      {isLoading && <ActivityIndicator />}
      {!isLoading && product && (
        <Card
          containerStyle={{
            height: "95%",
            width: Dimensions.get("window").width * 0.93,
            borderRadius: 15,
            padding: 0,
            gap: 0,
          }}
          wrapperStyle={{ height: "100%" }}
        >
          {/* <Card.Title>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: 2,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor: primaryColor.main.value,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  ...shadowsStyles.sm,
                }}
              >
                <Text
                  style={{
                    color: palette.primary.main.contrastText,
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  {product?.title}
                </Text>
                <Badge
                  status="primary"
                  containerStyle={{ position: "relative" }}
                  value={product.price.toFixed(2) + t("CURRENCY.LV")}
                />
              </View>
            </Card.Title> */}
          {/* <Card.Divider /> */}
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                marginBottom: 5,
                overflow: "hidden",
              }}
            >
              <Card.Image
                source={{
                  uri: mainImage,
                }}
                style={{
                  width: Dimensions.get("window").width * 0.93,
                  height: Dimensions.get("window").height * 0.4,
                  margin: "auto",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  ...shadowsStyles.sm,
                }}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
              <Badge
                status="primary"
                containerStyle={{
                  position: "absolute",
                  bottom: 35,
                  right: -50,
                  transform: "rotate(-45deg)",
                }}
                badgeStyle={{ height: "auto", paddingHorizontal: 40 }}
                value={`${product.price.toFixed(2)} ${t("CURRENCY.LV")}`}
                textStyle={{ fontSize: 20 }}
              />
            </View>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              style={{ paddingHorizontal: 5 }}
            >
              {/* <View
              style={{
                flexDirection: "row",
                ...shadowsStyles.lg,
                marginVertical: 10,
                gap: 5,
              }}
            > */}
              {product.images.map((i) => (
                <Card.Image
                  key={i.id}
                  source={{
                    uri: UrlsUtility.getImageBaseURL() + "/" + i.url,
                  }}
                  style={{
                    width: 70,
                    height: 100,
                    marginRight: 5,
                    borderRadius: 5,
                    ...shadowsStyles.sm,
                    borderWidth:
                      UrlsUtility.getImageBaseURL() + "/" + i.url === mainImage
                        ? 2
                        : 1,
                    borderColor:
                      UrlsUtility.getImageBaseURL() + "/" + i.url === mainImage
                        ? palette.primary.main.value
                        : "rgba(0,0,0,.5)",
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode="cover"
                  onPress={() =>
                    setMainImage(UrlsUtility.getImageBaseURL() + "/" + i.url)
                  }
                />
              ))}
              {/* </View> */}
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ marginBottom: 10 }}>{product.description}</Text>
            </View>
          </ScrollView>
          <Card.Divider />

          <View
            style={{
              gap: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              height: "auto",
              paddingHorizontal: 8,
              paddingBottom: 5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Button
                icon={<Icon name="add-shopping-cart" color="#ffffff" />}
                title={t("COMMON.ADD")}
                onPress={OnPressAddHandler}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                icon={<Icon name="message" color="#ffffff" />}
                title={t(
                  `COMMON.${
                    settingsState.settings.withPrice ? "ORDER" : "INQUIRY"
                  }`
                )}
                onPress={OnPressOrderHandler}
              />
            </View>
          </View>
        </Card>
      )}
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
