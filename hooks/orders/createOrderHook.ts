import React from "react";
import { useTranslation } from "react-i18next";

// stores
import { useDispatch } from "react-redux";
import { clearShoppingCartState } from "../../store/slices/shopping-cart/shoppingCartSlice";

//  models
import OrderModel from "../../models/db/OrderModel/OrderModel";

// interfaces
import IOrderModel from "../../models/db/OrderModel/IOrderModel";

// rests
import OrderRest from "../../rests/secure/OrderRest";
import { useSettingsState } from "../../store/slices/settings/settingsSlice";

// utilities

export default function useCreateOrderHook() {
  const settingsState = useSettingsState();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [order, setOrder] = React.useState<IOrderModel | null>(null);

  const createOrder = async (data: IOrderModel) => {
    setIsLoading(true);
    try {
      const response = await OrderRest.create(data);

      setOrder(new OrderModel(response.data as IOrderModel));
      dispatch(clearShoppingCartState());
      setIsLoading(false);
    } catch (error) {
      setError(
        t(
          `FORMS.GUEST_ORDER.MESSAGES.${
            settingsState.settings.withPrice
              ? "ORDER_WAS_NOT_SENT_SUCCESSFULLY"
              : "INQUIRY_WAS_NOT_SENT_SUCCESSFULLY"
          }`
        )
      );
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    order,
    createOrder,
  };
}
