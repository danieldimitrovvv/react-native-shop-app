import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";

import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

// icons
import { SimpleLineIcon } from "../../icons/SimpleLineIcon";
import { MaterialIcon } from "../../icons/MaterialIcon";
import { IonicIcon } from "../../icons/IonicIcon";

import CustomDrawerContent from "./CustomDrawerContent";
import HeaderTitle from "../../header/HeaderTitle";

import HomeScreen from "../../../app/page";
import ProfileScreen from "../../../app/profile/page";
import RightButtons from "../../header/RightButtons";
import DashboardScreen from "../../../app/dashboard/page";
import ProductListScreen from "../../../app/products/productsList/page";
import AddProductScreen from "../../../app/products/add-product/page";
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";
import AddSettingScreen from "../../../app/settings/add-seting/page";
import SettingListScreen from "../../../app/settings/settingsList/page";
import UserListScreen from "../../../app/users/usersList/page";
import AddUserScreen from "../../../app/users/add-user/page";
import ChangePasswordUserScreen from "../../../app/users/chaneg-password/page";
import RolesTypes from "../../../models/types/RolesTypes";
import UserDetailsScreen from "../../../app/users/details/page";
import AddTranslationScreen from "../../../app/translations/add-translation/page";
import TranslationListScreen from "../../../app/translations/translationsList/page";
import AddSocialScreen from "../../../app/socials/add-social/page";
import SocialListScreen from "../../../app/socials/socialsList/page";
import OrderListScreen from "../../../app/orders/ordersList/page";

const LeftDrawer = createDrawerNavigator<LeftDrawerStackParamList>();

const LeftDrawerScreen = () => {
  const { t } = useTranslation();

  const settingsState = useSettingsState();

  return (
    <LeftDrawer.Navigator
      screenOptions={{ drawerPosition: "left" }}
      drawerContent={CustomDrawerContent}
    >
      <LeftDrawer.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          headerTitle: (props) => <HeaderTitle title="" />,
          drawerIcon: (config) => (
            <SimpleLineIcon size="medium" color={config.color} name="home" />
          ),
          headerRight: () => <RightButtons />,
        }}
      />

      <LeftDrawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t("NAV.PROFILE").toString(),
          drawerIcon: (config) => (
            <SimpleLineIcon size="medium" color={config.color} name="user" />
          ),
        }}
        initialParams={{ id: settingsState.loginUser?.id.toString() }}
      />

      {settingsState.loginUser &&
        [RolesTypes.ADMIN, RolesTypes.TECHNICIAN].includes(
          settingsState.loginUser.role ?? RolesTypes.UNKNOWN
        ) && (
          <>
            <LeftDrawer.Screen
              name="AddProduct"
              component={AddProductScreen}
              options={{
                title: t("NAV.ADD_PRODUCT").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="plus"
                  />
                ),
                headerRight: () => <RightButtons />,
              }}
              initialParams={{ id: undefined }}
            />

            <LeftDrawer.Screen
              name="ProductsList"
              component={ProductListScreen}
              options={{
                title: t("NAV.PRODUCTS_LIST").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="list"
                  />
                ),
              }}
              initialParams={{ refreshTimeStamp: new Date().getMilliseconds() }}
            />
          </>
        )}

      {settingsState.loginUser &&
        [RolesTypes.ADMIN, RolesTypes.TECHNICIAN].includes(
          settingsState.loginUser.role ?? RolesTypes.UNKNOWN
        ) && (
          <>
            <LeftDrawer.Screen
              name="OrdersList"
              component={OrderListScreen}
              options={{
                title: t("NAV.ORDERS_LIST").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="list"
                  />
                ),
                headerRight: () => <RightButtons />,
              }}
              initialParams={{ refreshTimeStamp: new Date().getMilliseconds() }}
            />

            <LeftDrawer.Screen
              name="AddUser"
              component={AddUserScreen}
              options={{
                title: t("NAV.ADD_USER").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="plus"
                  />
                ),
                headerRight: () => <RightButtons />,
              }}
              initialParams={{ id: undefined }}
            />

            <LeftDrawer.Screen
              name="UserDetails"
              component={UserDetailsScreen}
              options={{
                drawerItemStyle: { display: "none" },
                title: t("NAV.PROFILE").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="plus"
                  />
                ),
                headerRight: () => <RightButtons />,
              }}
              initialParams={{ id: undefined }}
            />

            <LeftDrawer.Screen
              name="ChangeUserPassword"
              component={ChangePasswordUserScreen}
              options={{
                drawerItemStyle: { display: "none" },
                title: t("NAV.CHANGE_USER_PASSWORD").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="plus"
                  />
                ),
                headerRight: () => <RightButtons />,
              }}
              initialParams={{ id: undefined }}
            />

            <LeftDrawer.Screen
              name="UsersList"
              component={UserListScreen}
              options={{
                title: t("NAV.USERS_LIST").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="list"
                  />
                ),
              }}
              initialParams={{ refreshTimeStamp: new Date().getMilliseconds() }}
            />
          </>
        )}

      {settingsState.loginUser &&
        [RolesTypes.ADMIN].includes(
          settingsState.loginUser.role ?? RolesTypes.UNKNOWN
        ) && (
          <>
            <LeftDrawer.Screen
              name="AddSocialContacts"
              component={AddSocialScreen}
              options={{
                title: t("NAV.ADD_SOCIAL").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="plus"
                  />
                ),
                headerRight: () => <RightButtons />,
              }}
              initialParams={{ id: undefined }}
            />

            <LeftDrawer.Screen
              name="SocialContactsList"
              component={SocialListScreen}
              options={{
                title: t("NAV.SOCIALS_LIST").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="list"
                  />
                ),
              }}
              initialParams={{ refreshTimeStamp: new Date().getMilliseconds() }}
            />

            <LeftDrawer.Screen
              name="AddTranslation"
              component={AddTranslationScreen}
              options={{
                title: t("NAV.ADD_TRANSLATION").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="plus"
                  />
                ),
                headerRight: () => <RightButtons />,
              }}
              initialParams={{ id: undefined }}
            />

            <LeftDrawer.Screen
              name="TranslationsList"
              component={TranslationListScreen}
              options={{
                title: t("NAV.TRANSLATIONS_LIST").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="list"
                  />
                ),
              }}
              initialParams={{ refreshTimeStamp: new Date().getMilliseconds() }}
            />

            <LeftDrawer.Screen
              name="AddSetting"
              component={AddSettingScreen}
              options={{
                drawerItemStyle: { display: "none" },
                title: t("NAV.ADD_SETTING").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="plus"
                  />
                ),
                headerRight: () => <RightButtons />,
              }}
              initialParams={{ id: undefined }}
            />

            <LeftDrawer.Screen
              name="SettingsList"
              component={SettingListScreen}
              options={{
                title: t("NAV.SETTINGS_LIST").toString(),
                drawerIcon: (config) => (
                  <SimpleLineIcon
                    size="medium"
                    color={config.color}
                    name="list"
                  />
                ),
              }}
              initialParams={{ refreshTimeStamp: new Date().getMilliseconds() }}
            />
          </>
        )}
    </LeftDrawer.Navigator>
  );
};

export default LeftDrawerScreen;
