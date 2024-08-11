import React from "react";
import { View } from "react-native";

// styles
import { containerStyles } from "../../../styles/main";

//  hooks
import useGetAllSocialsHook from "../../../hooks/socials/getAllSocialsHook";

// types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

import Pagination from "../../../components/pagination/Pagination";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SocialsTable from "./components/SocialsTable";

type Props = NativeStackScreenProps<
  LeftDrawerStackParamList,
  "SocialContactsList"
>;

export default function SocialListScreen({ navigation, route }: Props) {
  const tableData = useGetAllSocialsHook({
    refetchKey: route.params?.refreshTimeStamp ?? new Date().getMilliseconds(),
  });

  React.useEffect(() => {
    if (route.params?.refreshTimeStamp) {
      tableData.fetchSocials();
    }
  }, [route.params]);

  return (
    <View style={containerStyles.containerColumn}>
      <SocialsTable socials={tableData.socials ?? []} />
      <Pagination
        onChangePage={tableData.onChangePage}
        totalPages={tableData.totalPages}
        currentPage={tableData.page}
      />
    </View>
  );
}
