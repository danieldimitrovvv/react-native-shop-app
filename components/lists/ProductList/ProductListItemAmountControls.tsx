import React from "react";

// store
import {
  IShoppingCartItem,
  decrementShoppingCartItemAmount,
  incrementShoppingCartItemAmount,
} from "../../../store/slices/shopping-cart/shoppingCartSlice";
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";
import { useDispatch } from "react-redux";

// components
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";

// styles
import { black, greyColor, primaryColor } from "../../../styles/colors";

type Props = {
  item: IShoppingCartItem;
  withControls?: boolean;
};

export default function ProductListItemAmountControls({
  item,
  withControls = false,
}: Props) {
  const settingsState = useSettingsState();
  const dispatch = useDispatch();

  const iconSize = 15;

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: greyColor.main.value,
          borderRadius: 15,
        }}
      >
        {withControls && (
          <Icon
            reverse
            name="remove"
            color={primaryColor.main.value}
            size={iconSize}
            onPress={() => {
              dispatch(
                decrementShoppingCartItemAmount({
                  productId: item.product.id,
                  removeAmount: 1,
                })
              );
            }}
          />
        )}

        <Text style={{ paddingHorizontal: 10 }}>{item.amount}</Text>

        {withControls && (
          <Icon
            reverse
            name="add"
            color={primaryColor.main.value}
            size={iconSize}
            onPress={() => {
              dispatch(
                incrementShoppingCartItemAmount({
                  productId: item.product.id,
                  addAmount: 1,
                })
              );
            }}
          />
        )}
      </View>

      {settingsState.settings.withPrice && (
        <Text style={{ fontWeight: 500, fontSize: 20 }}>
          {(item.product.price * item.amount).toFixed(2)}{" "}
          {item.product.currencyCode}
        </Text>
      )}
    </View>
  );
}
