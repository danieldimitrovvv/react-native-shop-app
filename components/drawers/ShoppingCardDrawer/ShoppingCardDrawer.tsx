import {
  createDrawerNavigator,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";

import ShoppingCardDrawerStackParamList from "../../../types/ShoppingCardDrawerStackParamListTypes";

import ShoppingCardDrawerContent from "./ShoppingCardDrawerContent";
import ShoppingCardScreen from "../../../app/shoppingCard/page";

export const ShoppingCardDrawer =
  createDrawerNavigator<ShoppingCardDrawerStackParamList>();

const ShoppingCardDrawerScreen = () => {
  const { t } = useTranslation();

  return (
    <ShoppingCardDrawer.Navigator
      screenOptions={{ drawerPosition: "right", drawerType: "slide" }}
      drawerContent={ShoppingCardDrawerContent}
    >
      <ShoppingCardDrawer.Screen
        name="HomeShoppingCard"
        component={ShoppingCardScreen}
        options={{
          headerTitle: () => <></>,
          header: () => <></>,
        }}
      />
    </ShoppingCardDrawer.Navigator>
  );
};

export default ShoppingCardDrawerScreen;
