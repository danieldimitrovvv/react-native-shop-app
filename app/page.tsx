import React from "react";
import { Avatar, ListItem } from "react-native-elements";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import SafeAreaView from "react-native-safe-area-view";

// types
import LeftDrawerStackParamList from "../types/LeftDrawerStackParamListTypes";
import RootStackParamList from "../types/RootStackParamListTypes";

// hooks
import useGetLatestsProductsHook from "../hooks/products/getLatestsProductsHook";

// models
import ProductModel from "../models/db/ProductModel/ProductModel";

// interfaces
import IProductModel from "../models/db/ProductModel/IProductModel";

// store
import { useSearchState } from "../store/slices/search/searchSlice";

// styles
import { containerStyles } from "../styles/main";

import { View, FlatList, ActivityIndicator } from "react-native";
import ErrorMessage from "../components/messages/ErrorMessage";
import ProductListItem from "../components/lists/ProductList/ProductListItem";
import {
  setSettingsServerSettings,
  useSettingsState,
} from "../store/slices/settings/settingsSlice";
import { useDispatch } from "react-redux";
import ISettingsStoreModel from "../store/slices/settings/SettingsStoreModel/ISettingsStoreModel";
import SettingsStoreModel from "../store/slices/settings/SettingsStoreModel/SettingsStoreModel";
import ConvertorUtility from "../utilities/ConvertorUtility";
import useGetSettingsFromCacheHook from "../hooks/settings/getSettingsFromCacheHook";

type Props = NativeStackScreenProps<
  LeftDrawerStackParamList & RootStackParamList,
  "Home"
>;

function HomeScreen({ navigation }: Props) {
  const dispatch = useDispatch();

  const { settings } = useGetSettingsFromCacheHook();

  const searchState = useSearchState();

  const settingsState = useSettingsState();

  const { isLoading, error, products } = useGetLatestsProductsHook(
    settingsState.settings.getLatest
  );

  const keyExtractor = (item: IProductModel, index: number) =>
    item.id.toString();

  const renderItem = ({ item }: { item: IProductModel }) => (
    <ProductListItem
      product={new ProductModel(item)}
      onPress={() =>
        navigation.navigate("ProductDetails", { id: item.id.toString() })
      }
    />
  );

  const listData = React.useMemo(
    () =>
      searchState.searchProducts.length > 0
        ? searchState.searchProducts
        : products,
    [products, searchState.searchProducts]
  );

  React.useEffect(() => {
    if (settings) {
      dispatch(
        setSettingsServerSettings(
          ConvertorUtility.classToInterface<
            SettingsStoreModel,
            ISettingsStoreModel
          >(settings)
        )
      );
    }
  }, [settings]);

  return (
    <SafeAreaView
      style={{ flex: 1, gap: 10, ...containerStyles.containerRowCenter }}
    >
      <View style={{ ...containerStyles.containerColumn, height: "100%" }}>
        {error && <ErrorMessage message={error} />}
        {isLoading && (
          <View style={{ paddingVertical: 10 }}>
            <ActivityIndicator />
          </View>
        )}

        {!isLoading && listData && (
          <FlatList
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            data={listData}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
