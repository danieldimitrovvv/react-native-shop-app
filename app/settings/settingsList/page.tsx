import React from "react";
import { View } from "react-native";

import { containerStyles } from "../../../styles/main";
import useGetAllSettingsHook from "../../../hooks/settings/getAllSettingsHook";
import Pagination from "../../../components/pagination/Pagination";
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SettingsTable from "./components/SettingsTable";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "SettingsList">;

export default function SettingListScreen({ navigation, route }: Props) {
  const getAllData = useGetAllSettingsHook({
    refetchKey: route.params?.refreshTimeStamp,
  });

  const tableData = getAllData;

  React.useEffect(() => {
    if (route.params?.refreshTimeStamp) {
      getAllData.fetchSettings();
    }
  }, [route.params]);
  return (
    <View style={containerStyles.containerColumn}>
      {/* TODO:: searchForm */}
      {/* <SearchForm
        onSubmit={handelOnSubmit}
        isLoading={tableData.isLoading}
        error={tableData.error}
      /> */}
      <SettingsTable settings={tableData.settings ?? []} />
      <Pagination
        onChangePage={tableData.onChangePage}
        totalPages={tableData.totalPages}
        currentPage={tableData.page}
      />
    </View>
  );
}
