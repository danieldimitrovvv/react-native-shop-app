import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// models
import ISettingsModel from "../../../models/db/SettingsModel/ISettingsModel";

//  types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

//  hooks
import useCreateUpdateSettingHook from "../../../hooks/settings/createUpdateSettingHook";
import useGetSettingHook from "../../../hooks/settings/getSettingHook";

// styles
import palette, { greyColor, successColor } from "../../../styles/colors";
import { formStyles } from "../../../styles/form";
import { containerStyles } from "../../../styles/main";

// store
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";

//  routes
import RootStackHeaderTitle from "../../../routes/RootStackHeaderTitle";

// components
import { ActivityIndicator, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import ErrorMessage from "../../../components/messages/ErrorMessage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import CreateInput from "../../../components/form/CreateInput";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "AddSetting">;

const AddSettingScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const navigator = useNavigation<NavigationProp<LeftDrawerStackParamList>>();

  const settingsState = useSettingsState();

  const editSettingId = route.params?.id
    ? parseInt(route.params?.id ?? "0")
    : undefined;

  const {
    isLoading: isLoadingEditSetting,
    error: errorEditSetting,
    setting: editSetting,
    clearSetting: clearEditSetting,
  } = useGetSettingHook(editSettingId);

  const { isLoading, error, createUpdateSetting, setting, clearSetting } =
    useCreateUpdateSettingHook(editSetting?.id ?? 0);

  function initState(state?: ISettingsModel | null) {
    return {
      key: {
        value: state?.key ?? "",
        isValid: (state?.key && state?.key?.length > 0) || false,
      },
      value: { value: state?.value ?? "", isValid: true },
    };
  }
  const [state, setState] = React.useState(
    initState(editSetting ?? ({} as ISettingsModel))
  );

  const [redirectTimeout, setRedirectTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  function clearState() {
    setState(initState({} as ISettingsModel));
    clearEditSetting();
    clearSetting();
  }

  function onChangeInputHandler({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) {
    setState((prevState) => ({
      ...prevState,
      [name]: { value, isValid: value },
    }));
  }

  async function handleOnSubmit() {
    const requestData = {
      key: state.key.value,
      value: state.value.value,
    } as ISettingsModel;

    await createUpdateSetting(requestData);

    const timeout = setTimeout(() => {
      // clear state
      clearState();
      navigator.navigate("SettingsList", {
        refreshTimeStamp: new Date().getMilliseconds(),
      });
    }, settingsState.settings.autoRedirect);

    setRedirectTimeout(timeout);
  }

  React.useEffect(() => {
    if (editSetting) {
      navigation.setOptions({
        headerTitle: (props) => (
          <RootStackHeaderTitle
            title={editSetting?.key ?? ""}
            titleProps={{
              style: { fontSize: 18, color: palette.primary.main.value },
            }}
          />
        ),
      });

      setState(initState(editSetting));
    }
  }, [editSetting]);

  React.useEffect(() => {
    return () => {
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [redirectTimeout]);

  React.useEffect(() => {
    if (!route.params?.id) {
      clearEditSetting();
    }
  }, [route.params]);

  const disableSubmitButton = React.useMemo(
    () => !state.key.value || !state.value.value,
    [state]
  );

  return (
    <ScrollView
      style={{
        ...formStyles.container,
        paddingBottom: 20,
      }}
    >
      {error && <ErrorMessage message={error} />}
      {isLoading && <ActivityIndicator />}

      {!isLoading && setting && (
        <View>
          <Text style={formStyles.title}>
            {setting.key} - {setting.value}
          </Text>
          <Text
            style={{
              backgroundColor: successColor.main.value,
              color: successColor.main.contrastText,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {t("FORMS.SETTINGS.MESSAGES.ADDED_SUCCESSFULLY")}
          </Text>

          <View style={{ ...formStyles.buttonView, marginBottom: 10 }}>
            <Button
              onPress={() => {
                clearState();
                if (redirectTimeout) clearTimeout(redirectTimeout);
                navigation.navigate("AddSetting", { id: undefined });
              }}
              title={t(`FORMS.SETTINGS.ADD_SETTING`).toUpperCase()}
              icon={<Icon name="add" type="material-icons" color={"#fff"} />}
            />
          </View>
        </View>
      )}

      {!isLoading && !setting && (
        <>
          <View
            style={{
              ...containerStyles.containerRowCenter,
              marginBottom: 10,
            }}
          >
            <Text style={{ ...formStyles.title, flex: 1, flexWrap: "wrap" }}>
              {t(
                `FORMS.SETTINGS.${
                  !editSetting ? "ADD_SETTING" : "EDIT_SETTING"
                }`
              )}
            </Text>
          </View>

          <View style={formStyles.inputView}>
            <CreateInput
              placeholder={t("FORMS.SETTINGS.KEY")}
              value={state.key.value}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "key", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.SETTINGS.VALUE")}
              value={state.value.value.toString()}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "value", value: text })
              }
            />
          </View>

          <View style={{ ...formStyles.buttonView, marginBottom: 30 }}>
            <Button
              onPress={handleOnSubmit}
              title={t(
                `FORMS.SETTINGS.${
                  !editSetting ? "ADD_SETTING" : "EDIT_SETTING"
                }`
              ).toUpperCase()}
              icon={
                <Icon
                  name={!editSetting ? "add" : "edit"}
                  type="material-icons"
                  color={disableSubmitButton ? greyColor.main.value : "#fff"}
                />
              }
              disabled={disableSubmitButton}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default AddSettingScreen;
