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

// types
import OrderStatusTypes from "../../models/types/OrderStatusTypes";

interface SearchProps {
  status?: OrderStatusTypes | null;
}
export default function useGetAllOrdersWithFiltersHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [orders, setOrders] = React.useState<OrderResponseModel[] | null>(null);

  const [filters, setFilters] = React.useState<SearchProps>({
    status: null,
  });

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  function handelSetFilters(filters: SearchProps) {
    setFilters(filters);
    onChangePage(0);
  }

  React.useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      try {
        const pageable = new PageableModel({
          page,
          rowsPerPage,
        } as IPageable);
        const response = await OrderRest.getByStatus(
          filters.status ?? OrderStatusTypes.UNKNOWN,
          pageable
        );
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
  }, [page, rowsPerPage, filters]);

  return {
    isLoading,
    error,
    orders,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    setFilters: handelSetFilters,
    onChangePage,
    onChangeRowsPerPage,
  };
}
