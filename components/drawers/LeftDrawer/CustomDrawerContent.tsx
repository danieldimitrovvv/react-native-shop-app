import { useTranslation } from "react-i18next";
import * as Linking from "expo-linking";

// styles
import palette, { greyColor, primaryColor } from "../../../styles/colors";

// hooks
import useLogoutHook from "../../../hooks/logoutHook";

// store
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";

// types
import RootStackParamList from "../../../types/RootStackParamListTypes";

//  components
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { Divider, Icon } from "react-native-elements";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { SimpleLineIcon } from "../../icons/SimpleLineIcon";
import UserCard from "../../cards/UserCard/UserCard";
import CustomDrawerItemList from "./components/CustomDrawerItemList";
import { CUSTOM_ROUTES } from "../../../routes/navigation-routes/routes";
import { Avatar, ListItem } from "@rneui/base";
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";
import CustomListItem from "../../lists/CustomListItem";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation();

  const settingsState = useSettingsState();

  const navigator =
    useNavigation<
      NavigationProp<RootStackParamList & LeftDrawerStackParamList>
    >();

  const { isLoading: logoutIsLoading, logout } = useLogoutHook();

  async function onPressLogoutHandler() {
    if (logoutIsLoading) {
      return;
    }

    try {
      await logout();
      navigator.navigate("Home");
      props.navigation.closeDrawer();
    } catch (error) {
      console.log("logout error", error);
    }
  }

  return (
    <>
      {/* {settingsState.loginUser && <UserCard user={settingsState.loginUser} />} */}
      {settingsState.loginUser && (
        <CustomListItem
          bottomDivider
          title={`${settingsState.loginUser.firstName} ${settingsState.loginUser.lastName}`}
          subTitle={`${settingsState.loginUser.email} | ${settingsState.loginUser.phone}`}
          imageTitle={`${settingsState.loginUser.firstName[0]}${settingsState.loginUser.lastName[0]}`}
          onPress={() => {
            navigator.navigate("Profile", {
              id: settingsState.loginUser?.id
                ? settingsState.loginUser?.id.toString()
                : "0",
            });
          }}
        />
      )}

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 0,
        }}
      >
        {/* <DrawerItemList {...props} /> */}

        <CustomDrawerItemList {...props} customRoutes={CUSTOM_ROUTES} />
      </DrawerContentScrollView>
      {/* <DrawerItem
        label={t("COMMON.HELP")}
        onPress={() =>
          Linking.openURL("https://www.facebook.com/daniel.dimitrov.188")
        }
        icon={(config) => (
          <SimpleLineIcon size="medium" color={config.color} name="bell" />
        )}
      /> */}

      <Divider />
      <CustomListItem
        title="Daniel Dimitrov (developer)"
        subTitle="danieldimitrovvv95@gmail.com | +359896656393 "
        imageSource={require("../../../assets/images/developer.jpg")}
        onPress={() => {
          Linking.openURL("https://www.facebook.com/daniel.dimitrov.188");
        }}
      />
      <DrawerItem
        label={t("COMMON.LOGOUT")}
        labelStyle={{ color: "white" }}
        onPress={onPressLogoutHandler}
        icon={(config) =>
          logoutIsLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Icon name="logout" size={15} color="white" />
          )
        }
        style={{ backgroundColor: palette.error.main.value }}
      />
    </>
  );
}

export default CustomDrawerContent;
