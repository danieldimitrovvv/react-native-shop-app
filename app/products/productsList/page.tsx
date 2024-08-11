import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import { containerStyles } from "../../../styles/main";
import { ProductCategoryTypes } from "../../../models/types/ProductCategoryTypes";
import useGetAllProductsWithFiltersHook from "../../../hooks/products/getAllProductsWithFiltersHook";
import useGetAllProductsHook from "../../../hooks/products/getAllProductsHook";
import ProductsTable from "./components/ProductsTable";
import Pagination from "../../../components/pagination/Pagination";
import SearchForm from "./components/SearchForm";
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "ProductsList">;

export default function ProductListScreen({ navigation, route }: Props) {
  const getFilterData = useGetAllProductsWithFiltersHook({ withAll: true });

  const getAllData = useGetAllProductsHook();

  const tableData = getFilterData.products ? getFilterData : getAllData;

  function handelOnSubmit(
    searchVal: string,
    category: ProductCategoryTypes | null
  ) {
    getFilterData.setFilters({
      searchVal,
      category: category,
    });
  }

  React.useEffect(() => {
    if (route.params?.refreshTimeStamp) {
      getFilterData.setFilters({
        searchVal: "",
        category: null,
      });
    }
  }, [route.params]);
  return (
    <View style={containerStyles.containerColumn}>
      {/* TODO:: searchForm */}
      <SearchForm
        onSubmit={handelOnSubmit}
        isLoading={tableData.isLoading}
        error={tableData.error}
      />
      <ProductsTable products={tableData.products ?? []} />
      <Pagination
        onChangePage={tableData.onChangePage}
        totalPages={tableData.totalPages}
        currentPage={tableData.page}
      />
    </View>
  );
}
