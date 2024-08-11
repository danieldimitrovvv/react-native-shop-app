import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// components
import { View, Alert, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Menu } from "react-native-paper";

//  models
import BaseUserModel from "../../../../models/db/User/BaseUserModel/BaseUserModel";

// styles
import { containerStyles } from "../../../../styles/main";
import palette, { primaryColor, white } from "../../../../styles/colors";

// types
import LeftDrawerStackParamList from "../../../../types/LeftDrawerStackParamListTypes";
import RootStackParamList from "../../../../types/RootStackParamListTypes";
import RolesTypes from "../../../../models/types/RolesTypes";

// hooks
import useDeleteUserHook from "../../../../hooks/users/deleteUserHook";
import { useSettingsState } from "../../../../store/slices/settings/settingsSlice";

type OptionMenuProps = {
  user: BaseUserModel;
  updatedUser: (user: BaseUserModel | null) => void;
  deleteUserCallback: (user: BaseUserModel) => void;
};

const OptionMenu = ({
  user,
  updatedUser,
  deleteUserCallback,
}: OptionMenuProps) => {
  const { t } = useTranslation();

  const settingsState = useSettingsState();

  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList & LeftDrawerStackParamList>
    >();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const {
    isLoading: deleteIsLoading,
    error: deleteError,
    effectedRows,
    deleteUser,
  } = useDeleteUserHook();

  const [row, setRow] = React.useState<BaseUserModel | null>(user);

  function onPressPreviewHandel() {
    navigation.navigate("UserDetails", { id: user.id.toString() });
    closeMenu();
  }

  function onPressEditHandel() {
    navigation.navigate("AddUser", { id: user.id.toString() });
    closeMenu();
  }

  function onPressChangeUserPasswordHandel() {
    navigation.navigate("ChangeUserPassword", { id: user.id.toString() });
    closeMenu();
  }

  function onDeleteHandel() {
    deleteUser(user.id);
    closeMenu();
  }

  React.useEffect(() => {
    setRow(user);
  }, [user]);

  React.useEffect(() => {
    if (effectedRows > 0) {
      setRow(null);
      if (row) {
        deleteUserCallback(row);
      }
    }
  }, [effectedRows, row]);

  React.useEffect(() => {
    updatedUser(row);
  }, [row]);

  function ErrorLabel({ message }: { message: string }) {
    return <Text style={{ color: palette.error.main.value }}>{message}</Text>;
  }

  const anchor = (
    <Icon
      color={palette.primary.light.value}
      type="font-awesome"
      name="ellipsis-v"
      onPress={openMenu}
      size={15}
      reverse
    />
  );

  const iconProps = {
    type: "font-awesome",
    size: 15,
    color: white,
    style: { marginRight: 5 },
  };

  if (!row) {
    return <></>;
  }

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
        <View
          style={{
            ...containerStyles.containerColumn,
            padding: 5,
            gap: 5,
            alignItems: "stretch",
          }}
        >
          <Button
            title={t("COMMON.PREVIEW")}
            onPress={onPressPreviewHandel}
            icon={<Icon name="preview" {...iconProps} type="material-icons" />}
          />

          <Button
            title={t("COMMON.EDIT")}
            onPress={onPressEditHandel}
            icon={<Icon name="edit" {...iconProps} type="material-icons" />}
          />

          <Button
            title={t("FORMS.USER.CHANGE_USER_PASSWORD")}
            onPress={onPressChangeUserPasswordHandel}
            icon={<Icon name="sync" {...iconProps} type="material-icons" />}
          />

          <Button
            title={
              deleteError ? (
                <ErrorLabel message={deleteError} />
              ) : (
                t("COMMON.DELETE")
              )
            }
            loading={deleteIsLoading}
            onPress={onDeleteHandel}
            icon={
              <Icon
                name="trash"
                {...iconProps}
                color={palette.error.light.value}
              />
            }
          />
        </View>
      </Menu>
    </View>
  );
};

export default OptionMenu;
