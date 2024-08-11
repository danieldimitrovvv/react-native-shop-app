import React from "react";
import { View } from "react-native";

import { containerStyles } from "../../../styles/main";
import useGetAllOrdersWithFiltersHook from "../../../hooks/orders/getAllOrdersWithFiltersHook";
import useGetAllOrdersHook from "../../../hooks/orders/getAllOrdersHook";
import OrdersTable from "./components/OrdersTable";
import Pagination from "../../../components/pagination/Pagination";
import SearchForm from "./components/SearchForm";
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import OrderStatusTypes from "../../../models/types/OrderStatusTypes";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "OrdersList">;

export default function OrderListScreen({ navigation, route }: Props) {
  const getFilterData = useGetAllOrdersWithFiltersHook();

  const getAllData = useGetAllOrdersHook();

  const tableData = getFilterData.orders ? getFilterData : getAllData;

  function handelOnSubmit(status: OrderStatusTypes | null) {
    getFilterData.setFilters({
      status: status,
    });
  }

  React.useEffect(() => {
    if (route.params?.refreshTimeStamp) {
      getFilterData.setFilters({
        status: null,
      });
    }
  }, [route.params]);
  return (
    <View style={containerStyles.containerColumn}>
      <SearchForm
        onSubmit={handelOnSubmit}
        isLoading={tableData.isLoading}
        error={tableData.error}
      />
      <OrdersTable orders={tableData.orders ?? []} />
      <Pagination
        onChangePage={tableData.onChangePage}
        totalPages={tableData.totalPages}
        currentPage={tableData.page}
      />
    </View>
  );
}
