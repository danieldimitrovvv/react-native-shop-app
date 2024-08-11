import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FlatList, SafeAreaView, View } from "react-native";

// types
import ShoppingCardDrawerStackParamList from "../../types/ShoppingCardDrawerStackParamListTypes";

// stores
import {
  IShoppingCartItem,
  clearShoppingCartInquiryItem,
  closedShoppingCartModal,
  useShoppingCartState,
} from "../../store/slices/shopping-cart/shoppingCartSlice";

//  models
import ProductModel from "../../models/db/ProductModel/ProductModel";

// components
import SimpleMessage from "../../components/messages/SimpleMessage";
import ProductListItem from "../../components/lists/ProductList/ProductListItem";
import RootStackParamList from "../../types/RootStackParamListTypes";
import { useSettingsState } from "../../store/slices/settings/settingsSlice";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";

type Props = NativeStackScreenProps<
  ShoppingCardDrawerStackParamList & RootStackParamList,
  "HomeShoppingCard"
>;

const ShoppingCardScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const shoppingCartState = useShoppingCartState();
  const settingsState = useSettingsState();

  const keyExtractor = (item: IShoppingCartItem, index: number) =>
    index.toString();

  const renderItem = ({ item }: { item: IShoppingCartItem }) => (
    <ProductListItem
      product={new ProductModel(item.product)}
      amount={item.amount}
      withActions={true}
      withAmountControls={settingsState.settings.withProductAmount}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          id: item.product.id.toString(),
        })
      }
    />
  );

  function onClickOrderButton() {
    dispatch(closedShoppingCartModal());
    dispatch(clearShoppingCartInquiryItem());

    // navigate to order form
    navigation.navigate("FinishOrder");
  }

  const totalSum = shoppingCartState.items
    .map((i) => i.product.price * i.amount)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, height: "100%" }}>
        {shoppingCartState.items.length > 0 && (
          <>
            <FlatList
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              data={shoppingCartState.items}
            />

            <View>
              {settingsState.settings.withPrice ? (
                <Button
                  title={`${t(
                    "COMMON.ORDER"
                  ).toUpperCase()}: ${totalSum.toFixed(2)} ${
                    shoppingCartState.items[0]?.product?.currencyCode ?? ""
                  }`}
                  onPress={onClickOrderButton}
                />
              ) : (
                <Button
                  title={t("COMMON.INQUIRY").toUpperCase()}
                  onPress={onClickOrderButton}
                />
              )}
            </View>
          </>
        )}

        {!shoppingCartState.items.length && (
          <SimpleMessage message={t("MESSAGES.MISSING_DATA")} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ShoppingCardScreen;
