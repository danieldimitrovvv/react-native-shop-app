import React from "react";
import { View } from "react-native";

// styles
import { containerStyles } from "../../../styles/main";

//  hooks
import useGetAllTranslationsHook from "../../../hooks/translations/getAllTranslationsHook";

// types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

import Pagination from "../../../components/pagination/Pagination";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TranslationsTable from "./components/TranslationsTable";

type Props = NativeStackScreenProps<
  LeftDrawerStackParamList,
  "TranslationsList"
>;

export default function TranslationListScreen({ navigation, route }: Props) {
  const tableData = useGetAllTranslationsHook({
    refetchKey: route.params?.refreshTimeStamp,
  });

  React.useEffect(() => {
    if (route.params?.refreshTimeStamp) {
      tableData.fetchTranslations();
    }
  }, [route.params]);

  return (
    <View style={containerStyles.containerColumn}>
      <TranslationsTable translations={tableData.translations ?? []} />
      <Pagination
        onChangePage={tableData.onChangePage}
        totalPages={tableData.totalPages}
        currentPage={tableData.page}
      />
    </View>
  );
}
