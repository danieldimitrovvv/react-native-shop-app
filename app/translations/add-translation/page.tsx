import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// models
import ITranslationModel from "../../../models/db/TranslationModel/ITranslationModel";

//  types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

//  hooks
import useGetTranslationHook from "../../../hooks/translations/getTranslationHook";
import useCreateUpdateTranslationHook from "../../../hooks/translations/createUpdateTranslationHook";

// styles
import palette, {
  greyColor,
  primaryColor,
  successColor,
} from "../../../styles/colors";
import { containerStyles } from "../../../styles/main";
import { shadowsStyles } from "../../../styles/shadows";
import { formStyles } from "../../../styles/form";

// store
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";

//  utilities
import UrlsUtility from "../../../utilities/UrlsUtility";

// components
import { ActivityIndicator, Text, View } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import ErrorMessage from "../../../components/messages/ErrorMessage";

// routes
import { NavigationProp, useNavigation } from "@react-navigation/native";
import RootStackHeaderTitle from "../../../routes/RootStackHeaderTitle";

import { ScrollView } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import CreateInput from "../../../components/form/CreateInput";
import LanguagesTypes from "../../../models/types/LanguagesTypes";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "AddTranslation">;

const AddTranslationScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const navigator = useNavigation<NavigationProp<LeftDrawerStackParamList>>();

  const settingsState = useSettingsState();

  const editTranslationId = route.params?.id
    ? parseInt(route.params?.id ?? "0")
    : undefined;

  const {
    isLoading: isLoadingEditTranslation,
    error: errorEditTranslation,
    translation: editTranslation,
    clearTranslation: clearEditTranslation,
  } = useGetTranslationHook(editTranslationId);

  const {
    isLoading,
    error,
    createUpdateTranslation,
    translation,
    clearTranslation,
  } = useCreateUpdateTranslationHook(editTranslation?.id ?? 0);

  function initState(state?: ITranslationModel | null) {
    return {
      key: {
        value: state?.key ?? "",
        isValid: (state?.key && state?.key?.length > 0) || false,
      },

      label: { value: state?.label ?? "", isValid: true },

      lang: {
        value: state?.lang ?? LanguagesTypes.UNKNOWN,
        isValid: state?.lang !== LanguagesTypes.UNKNOWN,
      },
    };
  }
  const [state, setState] = React.useState(
    initState(editTranslation ?? ({} as ITranslationModel))
  );

  const [redirectTimeout, setRedirectTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  function clearState() {
    setState(initState({} as ITranslationModel));
    clearEditTranslation();
    clearTranslation();
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
      label: state.label.value,
      lang: state.lang.value.toUpperCase(),
    } as ITranslationModel;

    await createUpdateTranslation(requestData);

    const timeout = setTimeout(() => {
      // clear state
      clearState();
      navigator.navigate("TranslationsList", {
        refreshTimeStamp: new Date().getMilliseconds(),
      });
    }, settingsState.settings.autoRedirect);

    setRedirectTimeout(timeout);
  }

  React.useEffect(() => {
    if (editTranslation) {
      navigation.setOptions({
        headerTitle: (props) => (
          <RootStackHeaderTitle
            title={editTranslation?.key ?? ""}
            titleProps={{
              style: { fontSize: 18, color: palette.primary.main.value },
            }}
          />
        ),
      });

      setState(initState(editTranslation));
    }
  }, [editTranslation]);

  React.useEffect(() => {
    return () => {
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [redirectTimeout]);

  React.useEffect(() => {
    if (!route.params?.id) {
      clearState();
    }
  }, [route.params]);

  const languageDropdownData = [
    ...Object.keys(LanguagesTypes)
      .filter((k) => k !== LanguagesTypes[LanguagesTypes.UNKNOWN])
      .map((key) => ({
        title: t("ENUMS.LANGUAGES_TYPES." + key.toUpperCase()),
        key,
      })),
  ];

  const disableSubmitButton = React.useMemo(
    () =>
      !state.key.isValid ||
      !state.label.isValid ||
      state.lang.value === LanguagesTypes.UNKNOWN,
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

      {!isLoading && translation && (
        <View>
          <Text style={formStyles.title}>
            {translation.key} - {translation.label}
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
            {t("FORMS.TRANSLATION.MESSAGES.ADDED_SUCCESSFULLY")}
          </Text>

          <View style={{ ...formStyles.buttonView, marginBottom: 10 }}>
            <Button
              onPress={() => {
                clearState();
                if (redirectTimeout) clearTimeout(redirectTimeout);
                navigation.navigate("AddTranslation", { id: undefined });
              }}
              title={t(`FORMS.TRANSLATION.ADD_TRANSLATION`).toUpperCase()}
              icon={<Icon name="add" type="material-icons" color={"#fff"} />}
            />
          </View>
        </View>
      )}

      {!isLoading && !translation && (
        <>
          <View
            style={{
              ...containerStyles.containerRowCenter,
              marginBottom: 10,
            }}
          >
            <Text style={{ ...formStyles.title, flex: 1, flexWrap: "wrap" }}>
              {t(
                `FORMS.TRANSLATION.${
                  !editTranslation ? "ADD_TRANSLATION" : "EDIT_TRANSLATION"
                }`
              )}
            </Text>
          </View>

          <View style={formStyles.inputView}>
            <SelectDropdown
              data={languageDropdownData}
              onSelect={(selectedItem, index) => {
                onChangeInputHandler({
                  name: "lang",
                  value:
                    LanguagesTypes[
                      selectedItem.key as keyof typeof LanguagesTypes
                    ],
                });
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View
                    style={{
                      ...formStyles.dropdownButtonStyle,
                      width: "100%",
                    }}
                  >
                    <Text style={formStyles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) ||
                        t("FORMS.TRANSLATION.MESSAGES.SELECT_LANG")}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...formStyles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    }}
                  >
                    <Text style={formStyles.dropdownItemTxtStyle}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={true}
              dropdownStyle={formStyles.dropdownMenuStyle}
              defaultValueByIndex={languageDropdownData.findIndex(
                (c) => c.key === state.lang.value.toUpperCase()
              )}
            />

            <CreateInput
              placeholder={t("FORMS.TRANSLATION.KEY")}
              value={state.key.value}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "key", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.TRANSLATION.LABEL")}
              value={state.label.value.toString()}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "label", value: text })
              }
            />
          </View>

          <View style={{ ...formStyles.buttonView, marginBottom: 30 }}>
            <Button
              onPress={handleOnSubmit}
              title={t(
                `FORMS.TRANSLATION.${
                  !editTranslation ? "ADD_TRANSLATION" : "EDIT_TRANSLATION"
                }`
              ).toUpperCase()}
              icon={
                <Icon
                  name={!editTranslation ? "add" : "edit"}
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

export default AddTranslationScreen;
