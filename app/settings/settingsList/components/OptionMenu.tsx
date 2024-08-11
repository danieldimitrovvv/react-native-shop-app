import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// components
import { View, Alert, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Menu } from "react-native-paper";

//  models
import SettingModel from "../../../../models/db/SettingsModel/SettingsModel";

// styles
import { containerStyles } from "../../../../styles/main";
import palette, { white } from "../../../../styles/colors";

// types
import RootStackParamList from "../../../../types/RootStackParamListTypes";

// hooks
import { useSettingsState } from "../../../../store/slices/settings/settingsSlice";
import LeftDrawerStackParamList from "../../../../types/LeftDrawerStackParamListTypes";

type OptionMenuProps = {
  setting: SettingModel;
  updatedSetting: (setting: SettingModel | null) => void;
};

const OptionMenu = ({ setting, updatedSetting }: OptionMenuProps) => {
  const { t } = useTranslation();

  const settingsState = useSettingsState();

  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList & LeftDrawerStackParamList>
    >();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [row, setRow] = React.useState<SettingModel | null>(setting);

  function onPressEditHandel() {
    navigation.navigate("AddSetting", { id: setting.id.toString() });
    closeMenu();
  }

  React.useEffect(() => {
    setRow(setting);
  }, [setting]);

  React.useEffect(() => {
    updatedSetting(row);
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
        </View>
      </Menu>
    </View>
  );
};

export default OptionMenu;
