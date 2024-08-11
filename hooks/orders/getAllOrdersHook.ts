import React from "react";
import { useTranslation } from "react-i18next";

// rests
import OrderRest from "../../rests/secure/OrderRest";

// models
import PageableModel from "../../models/ui/Pageable/PageableModel";
import OrderResponseModel from "../../models/ResponsesDTO/OrderResponseModel/OrderResponseModel";

// interfaces
import IPageable from "../../models/ui/Pageable/IPageable";

// hooks
import usePageableHook from "../pageableHook";

export default function useGetAllOrdersHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [orders, setOrders] = React.useState<OrderResponseModel[] | null>(null);

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  React.useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      try {
        const pageable = new PageableModel({
          page,
          rowsPerPage,
        } as IPageable);
        const response = await OrderRest.getAll(pageable);
        const data = response.data;
        setOrders(data.rows.map((i) => new OrderResponseModel(i)));
        onChangeCountRows(data.countRows);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("order fetch error", error);
        setError(t("COMMON.MESSAGES.ORDERS_NOT_FETCHED"));
        setIsLoading(false);
        throw error;
      }
    }

    fetchOrders();
  }, [page, rowsPerPage]);

  return {
    isLoading,
    error,
    orders,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
  };
}
