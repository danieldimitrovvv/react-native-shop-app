import React from "react";
import { useTranslation } from "react-i18next";

// styles
import { formStyles } from "../../../../styles/form";

// stores
import { useSettingsState } from "../../../../store/slices/settings/settingsSlice";
import {
  IShoppingCartItem,
  useShoppingCartState,
} from "../../../../store/slices/shopping-cart/shoppingCartSlice";

// hooks
import useCreateOrderHook from "../../../../hooks/orders/createOrderHook";

// models
import IOrderModel from "../../../../models/db/OrderModel/IOrderModel";
import ProductModel from "../../../../models/db/ProductModel/ProductModel";

import ErrorMessage from "../../../../components/messages/ErrorMessage";

//  components
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";
import SuccessMessage from "../../../../components/messages/SuccessMessage";
import ProductListItem from "../../../../components/lists/ProductList/ProductListItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import RootStackParamList from "../../../../types/RootStackParamListTypes";
import CreateInput from "../../../../components/form/CreateInput";

// images
const logo = require("../../../../assets/app-icon.png");

export default function OrderForm() {
  const { t } = useTranslation();

  //   navigator
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const settingsState = useSettingsState();
  const shoppingCartState = useShoppingCartState();
  const { isLoading, error, order, createOrder } = useCreateOrderHook();

  const [state, setState] = React.useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const [redirectTimeout, setRedirectTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const [expandedProducts, setExpandedProducts] =
    React.useState<boolean>(false);

  function onChangeInputHandler({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleOnSubmit() {
    const requestData = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      address: state.address,
      description: state.description,
      cartItems: shoppingCartState.inquiryItem
        ? [
            {
              product: shoppingCartState.inquiryItem,
              amount: 1,
            } as IShoppingCartItem,
          ]
        : shoppingCartState.items,
    } as IOrderModel;

    await createOrder(requestData);

    const timeout = setTimeout(() => {
      navigator.navigate("Home");
    }, settingsState.settings.autoRedirect);

    setRedirectTimeout(timeout);
  }

  React.useEffect(() => {
    return () => {
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [redirectTimeout]);

  const disableSubmitButton = React.useMemo(
    () =>
      state.firstName === "" ||
      state.lastName === "" ||
      state.email === "" ||
      state.phone === "" ||
      state.address === "" ||
      state.description === "",
    [state]
  );

  const totalSum = shoppingCartState.items
    .map((i) => i.product.price * i.amount)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  return (
    <ScrollView
      style={{
        ...formStyles.container,
      }}
    >
      {isLoading && <ActivityIndicator />}
      {!isLoading && error && <ErrorMessage message={t(error)} />}

      {!isLoading && order && (
        <SuccessMessage
          message={t(
            "FORMS.GUEST_ORDER.MESSAGES.INQUIRY_WAS_SENT_SUCCESSFULLY"
          )}
        />
      )}
      {!isLoading && !order && (
        <>
          <Text style={formStyles.title}>{t("COMMON.ORDER")}</Text>
          <View style={formStyles.inputView}>
            <CreateInput
              placeholder={t("FORMS.GUEST_ORDER.FIRST_NAME")}
              value={state.firstName}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "firstName", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.GUEST_ORDER.LAST_NAME")}
              value={state.lastName}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "lastName", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.GUEST_ORDER.EMAIL")}
              value={state.email}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "email", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.GUEST_ORDER.PHONE")}
              value={state.phone}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "phone", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.GUEST_ORDER.ADDRESS")}
              value={state.address}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "address", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.GUEST_ORDER.DESCRIPTION")}
              value={state.description}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "description", value: text })
              }
            />
          </View>

          <View style={formStyles.buttonView}>
            <Button
              onPress={handleOnSubmit}
              title={t(
                `FORMS.GUEST_ORDER.${
                  settingsState.settings.withPrice
                    ? "SEND_ORDER"
                    : "SEND_INQUIRY"
                }`
              ).toUpperCase()}
              disabled={disableSubmitButton}
            />
          </View>
        </>
      )}

      {shoppingCartState.inquiryItem ? (
        <ProductListItem
          key={shoppingCartState.inquiryItem.id}
          product={new ProductModel(shoppingCartState.inquiryItem)}
          withActions={true}
          withDeleteAction={false}
          withAmountControls={false}
          onPress={() => {
            navigator.navigate("ProductDetails", {
              id: shoppingCartState.inquiryItem?.id.toString() ?? "",
            });
          }}
        />
      ) : (
        <ListItem.Accordion
          content={
            <>
              <Icon name="list" size={30} />
              <ListItem.Content>
                <ListItem.Title>
                  {`${t("COMMON.PRODUCTS").toUpperCase()} ${totalSum.toFixed(
                    2
                  )} ${
                    shoppingCartState.items[0]?.product?.currencyCode ?? ""
                  }`}
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedProducts}
          onPress={() => setExpandedProducts(!expandedProducts)}
        >
          {shoppingCartState.items.map((i) => (
            <ProductListItem
              key={i.product.id}
              product={new ProductModel(i.product)}
              amount={i.amount}
              withActions={false}
              withAmountControls={false}
              badgeText={i.amount.toString()}
            />
          ))}
        </ListItem.Accordion>
      )}
    </ScrollView>
  );
}
