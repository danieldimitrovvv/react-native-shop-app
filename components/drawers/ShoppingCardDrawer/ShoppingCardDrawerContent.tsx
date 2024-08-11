import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import * as Linking from "expo-linking";
import { StyleSheet, Button, View, FlatList } from "react-native";
import { containerStyles } from "../../../styles/main";
import IProductModel from "../../../models/db/ProductModel/IProductModel";
import ProductModel from "../../../models/db/ProductModel/ProductModel";
import { Avatar, ListItem } from "react-native-elements";
import UrlsUtility from "../../../utilities/UrlsUtility";
import {
  IShoppingCartItem,
  useShoppingCartState,
} from "../../../store/slices/shopping-cart/shoppingCartSlice";
import React from "react";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const shoppingCardState = useShoppingCartState();

  const keyExtractor = (item: IShoppingCartItem, index: number) =>
    index.toString();

  const renderItem = ({ item }: { item: IShoppingCartItem }) => {
    const p = new ProductModel(item.product);

    return (
      <ListItem key={p.id} bottomDivider onPress={() => {}}>
        <Avatar
          size="large"
          source={{
            uri: UrlsUtility.getImageBaseURL() + "/" + p.getMainImg(),
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{p.title}</ListItem.Title>
          <ListItem.Subtitle>{p.price}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <DrawerContentScrollView style={styles.container} {...props}>
      <View style={{ flex: 1, height: "100%" }}>
        <FlatList
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={shoppingCardState.items}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { height: "90%" },
});

export default CustomDrawerContent;
