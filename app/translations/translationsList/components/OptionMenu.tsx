import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// components
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Menu } from "react-native-paper";

//  models
import TranslationModel from "../../../../models/db/TranslationModel/TranslationModel";

// styles
import { containerStyles } from "../../../../styles/main";
import palette, { white } from "../../../../styles/colors";

// types
import RootStackParamList from "../../../../types/RootStackParamListTypes";

// hooks
import useDeleteTranslationHook from "../../../../hooks/translations/deleteTranslationHook";
import { useSettingsState } from "../../../../store/slices/settings/settingsSlice";
import LeftDrawerStackParamList from "../../../../types/LeftDrawerStackParamListTypes";

type OptionMenuProps = {
  translation: TranslationModel;
  updatedTranslation: (translation: TranslationModel | null) => void;
  deleteTranslationCallback: (translation: TranslationModel) => void;
};

const OptionMenu = ({
  translation,
  updatedTranslation,
  deleteTranslationCallback,
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
    deleteTranslation,
  } = useDeleteTranslationHook();

  const [row, setRow] = React.useState<TranslationModel | null>(translation);

  function onPressEditHandel() {
    navigation.navigate("AddTranslation", { id: translation.id.toString() });
    closeMenu();
  }

  function onDeleteHandel() {
    deleteTranslation(translation.id);
    closeMenu();
  }

  React.useEffect(() => {
    setRow(translation);
  }, [translation]);

  React.useEffect(() => {
    if (effectedRows > 0) {
      setRow(null);
      if (row) {
        deleteTranslationCallback(row);
      }
    }
  }, [effectedRows, row]);

  React.useEffect(() => {
    updatedTranslation(row);
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
