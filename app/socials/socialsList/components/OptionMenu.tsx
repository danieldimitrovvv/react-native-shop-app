import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// components
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Menu } from "react-native-paper";

//  models
import SocialModel from "../../../../models/db/SocialModel/SocialModel";

// styles
import { containerStyles } from "../../../../styles/main";
import palette, { white } from "../../../../styles/colors";

// types
import RootStackParamList from "../../../../types/RootStackParamListTypes";

// hooks
import useDeleteSocialHook from "../../../../hooks/socials/deleteSocialHook";
import { useSettingsState } from "../../../../store/slices/settings/settingsSlice";
import LeftDrawerStackParamList from "../../../../types/LeftDrawerStackParamListTypes";

type OptionMenuProps = {
  social: SocialModel;
  updatedSocial: (social: SocialModel | null) => void;
  deleteSocialCallback: (social: SocialModel) => void;
};

const OptionMenu = ({
  social,
  updatedSocial,
  deleteSocialCallback,
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
    deleteSocial,
  } = useDeleteSocialHook();

  const [row, setRow] = React.useState<SocialModel | null>(social);

  function onPressEditHandel() {
    navigation.navigate("AddSocialContacts", { id: social.id.toString() });
    closeMenu();
  }

  function onDeleteHandel() {
    deleteSocial(social.id);
    closeMenu();
  }

  React.useEffect(() => {
    setRow(social);
  }, [social]);

  React.useEffect(() => {
    if (effectedRows > 0) {
      setRow(null);
      if (row) {
        deleteSocialCallback(row);
      }
    }
  }, [effectedRows, row]);

  React.useEffect(() => {
    updatedSocial(row);
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
            title={t("COMMON.EDIT")}
            onPress={onPressEditHandel}
            icon={<Icon name="edit" {...iconProps} type="material-icons" />}
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
