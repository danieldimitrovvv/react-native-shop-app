import React from "react";
import ProductModel from "../../../models/db/ProductModel/ProductModel";

//  utilities
import UrlsUtility from "../../../utilities/UrlsUtility";

// store
import { useDispatch } from "react-redux";
import { deleteShoppingCartItem } from "../../../store/slices/shopping-cart/shoppingCartSlice";

// components
import { Avatar, Badge, Button, ListItem } from "react-native-elements";
import { useTranslation } from "react-i18next";
import { errorColor } from "../../../styles/colors";
import ProductListItemAmountControls from "./ProductListItemAmountControls";
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";

type Props = {
  product: ProductModel;
  amount?: number;
  withActions?: boolean;
  withDeleteAction?: boolean;
  badgeText?: string;
  withAmountControls?: boolean;
  onPress?: () => void;
};

export default function ProductListItem(props: Props) {
  const {
    product: p,
    amount,
    withActions,
    withDeleteAction = true,
    badgeText,
    withAmountControls,
    onPress,
  } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const settingsState = useSettingsState();

  return (
    <ListItem.Swipeable
      key={p.id}
      leftContent={
        withActions && onPress ? (
          <Button
            title="Info"
            icon={{ name: "info", color: "white" }}
            buttonStyle={{ minHeight: "100%" }}
            onPress={onPress}
          />
        ) : null
      }
      rightContent={
        withActions && withDeleteAction ? (
          <Button
            title={t("COMMON.DELETE")}
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{
              minHeight: "100%",
              backgroundColor: errorColor.main.value,
            }}
            onPress={() => {
              dispatch(deleteShoppingCartItem(p.id));
            }}
          />
        ) : null
      }
      bottomDivider
      onPress={withActions ? undefined : onPress}
    >
      <Avatar
        size="large"
        avatarStyle={{ borderRadius: 15 }}
        source={{
          uri: UrlsUtility.getImageBaseURL() + "/" + p.getMainImg(),
        }}
      />
      {badgeText && (
        <Badge
          status="primary"
          containerStyle={{
            position: "absolute",
            top: 10,
            left: 10,
          }}
          value={badgeText}
        />
      )}
      <ListItem.Content>
        <ListItem.Title>{p.title}</ListItem.Title>
        <ListItem.Subtitle>{`${
          !amount || withAmountControls ? p.price : p.price * amount
        } ${t("CURRENCY.LV")}`}</ListItem.Subtitle>
        {withAmountControls &&
          settingsState.settings.withProductAmount &&
          p.amount > 1 && (
            <ProductListItemAmountControls
              item={{ product: p, amount: amount ?? p.amount }}
              withControls={withAmountControls}
            />
          )}
      </ListItem.Content>
      {withActions && <ListItem.Chevron />}
    </ListItem.Swipeable>
  );
}
