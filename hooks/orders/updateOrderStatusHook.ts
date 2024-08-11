import React from "react";

// stores
import { useDispatch } from "react-redux";
import { clearShoppingCartState } from "../../store/slices/shopping-cart/shoppingCartSlice";

//  models
import OrderResponseModel from "../../models/ResponsesDTO/OrderResponseModel/OrderResponseModel";

// interfaces
import IOrderResponseModel from "../../models/ResponsesDTO/OrderResponseModel/IOrderResponseModel";

// rests
import OrderRest from "../../rests/secure/OrderRest";

// types
import OrderStatusTypes from "../../models/types/OrderStatusTypes";
import { useTranslation } from "react-i18next";

export default function useUpdateOrderStatusHook() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [order, setOrder] = React.useState<IOrderResponseModel | null>(null);

  const updateOrderStatus = async (id: number, status: OrderStatusTypes) => {
    setIsLoading(true);
    try {
      const response = await OrderRest.updateStatus(id, status);

      setOrder(new OrderResponseModel(response.data as IOrderResponseModel));
      dispatch(clearShoppingCartState());
      setIsLoading(false);
    } catch (error) {
      setError(t(`COMMON.MESSAGES.ORDER_STATUS_NOT_UPDATED`));
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    order,
    updateOrderStatus,
  };
}
