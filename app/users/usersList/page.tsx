import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// styles
import { containerStyles } from "../../../styles/main";

// hooks
import useGetAllUsersWithFiltersHook from "../../../hooks/users/getAllUsersWithFiltersHook";
import useGetAllUsersHook from "../../../hooks/users/getAllUsersHook";

//  types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

//  components
import { View } from "react-native";
import UsersTable from "./components/UsersTable";
import Pagination from "../../../components/pagination/Pagination";
import SearchForm from "./components/SearchForm";
import RolesTypes from "../../../models/types/RolesTypes";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "UsersList">;

export default function UserListScreen({ navigation, route }: Props) {
  const getFilterData = useGetAllUsersWithFiltersHook();

  const getAllData = useGetAllUsersHook();

  const tableData = getFilterData.users ? getFilterData : getAllData;

  function handelOnSubmit(searchValue: string, role: RolesTypes | null) {
    getFilterData.setFilters({
      searchValue,
      role,
    });
  }

  React.useEffect(() => {
    if (route.params?.refreshTimeStamp) {
      getFilterData.setFilters({
        searchValue: "",
        role: null,
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
      <UsersTable users={tableData.users ?? []} />
      <Pagination
        onChangePage={tableData.onChangePage}
        totalPages={tableData.totalPages}
        currentPage={tableData.page}
      />
    </View>
  );
}
