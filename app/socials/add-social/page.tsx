import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// models
import ISocialModel from "../../../models/db/SocialModel/ISocialModel";

//  types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

//  hooks
import useGetSocialHook from "../../../hooks/socials/getSocialHook";
import useCreateUpdateSocialHook from "../../../hooks/socials/createUpdateSocialHook";

// styles
import palette, { greyColor, successColor } from "../../../styles/colors";
import { containerStyles } from "../../../styles/main";
import { formStyles } from "../../../styles/form";

// store
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";

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
import SocialTypes from "../../../models/types/SocialTypes";

type Props = NativeStackScreenProps<
  LeftDrawerStackParamList,
  "AddSocialContacts"
>;

const AddSocialScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const navigator = useNavigation<NavigationProp<LeftDrawerStackParamList>>();

  const settingsState = useSettingsState();

  const editSocialId = route.params?.id
    ? parseInt(route.params?.id ?? "0")
    : undefined;

  const {
    isLoading: isLoadingEditSocial,
    error: errorEditSocial,
    social: editSocial,
    clearSocial: clearEditSocial,
  } = useGetSocialHook(editSocialId);

  const { isLoading, error, createUpdateSocial, social, clearSocial } =
    useCreateUpdateSocialHook(editSocial?.id ?? 0);

  function initState(state?: ISocialModel | null) {
    return {
      link: {
        value: state?.link ?? "",
        isValid: (state?.link && state?.link?.length > 0) || false,
      },

      label: { value: state?.label ?? "", isValid: true },

      type: {
        value: state?.type ?? SocialTypes.UNKNOWN,
        isValid: state?.type !== SocialTypes.UNKNOWN,
      },
    };
  }
  const [state, setState] = React.useState(
    initState(editSocial ?? ({} as ISocialModel))
  );

  const [redirectTimeout, setRedirectTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  function clearState() {
    setState(initState({} as ISocialModel));
    clearEditSocial();
    clearSocial();
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
      link: state.link.value,
      label: state.label.value,
      type: state.type.value.toUpperCase(),
    } as ISocialModel;

    await createUpdateSocial(requestData);

    const timeout = setTimeout(() => {
      // clear state
      clearState();
      navigator.navigate("SocialContactsList", {
        refreshTimeStamp: new Date().getMilliseconds(),
      });
    }, settingsState.settings.autoRedirect);

    setRedirectTimeout(timeout);
  }

  React.useEffect(() => {
    if (editSocial) {
      navigation.setOptions({
        headerTitle: (props) => (
          <RootStackHeaderTitle
            title={editSocial?.label ?? ""}
            titleProps={{
              style: { fontSize: 18, color: palette.primary.main.value },
            }}
          />
        ),
      });

      setState(initState(editSocial));
    }
  }, [editSocial]);

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

  const socialContactsDropdownData = [
    ...Object.keys(SocialTypes)
      .filter((k) => k !== SocialTypes[SocialTypes.UNKNOWN])
      .map((key) => ({
        title: t("ENUMS.SOCIAL_TYPES." + key.toUpperCase()),
        key,
      })),
  ];

  const disableSubmitButton = React.useMemo(
    () =>
      !state.link.isValid ||
      !state.label.isValid ||
      state.type.value === SocialTypes.UNKNOWN,
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

      {!isLoading && social && (
        <View>
          <Text style={formStyles.title}>
            {social.label} - {social.type}
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
            {t("FORMS.SOCIAL.MESSAGES.ADDED_SUCCESSFULLY")}
          </Text>

          <View style={{ ...formStyles.buttonView, marginBottom: 10 }}>
            <Button
              onPress={() => {
                clearState();
                if (redirectTimeout) clearTimeout(redirectTimeout);
                navigation.navigate("AddSocialContacts", { id: undefined });
              }}
              title={t(`FORMS.SOCIAL.ADD_SOCIAL`).toUpperCase()}
              icon={<Icon name="add" type="material-icons" color={"#fff"} />}
            />
          </View>
        </View>
      )}

      {!isLoading && !social && (
        <>
          <View
            style={{
              ...containerStyles.containerRowCenter,
              marginBottom: 10,
            }}
          >
            <Text style={{ ...formStyles.title, flex: 1, flexWrap: "wrap" }}>
              {t(`FORMS.SOCIAL.${!editSocial ? "ADD_SOCIAL" : "EDIT_SOCIAL"}`)}
            </Text>
          </View>

          <View style={formStyles.inputView}>
            <SelectDropdown
              data={socialContactsDropdownData}
              onSelect={(selectedItem, index) => {
                onChangeInputHandler({
                  name: "type",
                  value:
                    SocialTypes[selectedItem.key as keyof typeof SocialTypes],
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
                        t("FORMS.SOCIAL.MESSAGES.SELECT_SOCIAL")}
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
              defaultValueByIndex={socialContactsDropdownData.findIndex(
                (c) => c.key === state.type.value.toUpperCase()
              )}
            />

            <CreateInput
              placeholder={t("FORMS.SOCIAL.LABEL")}
              value={state.label.value.toString()}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "label", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.SOCIAL.LINK")}
              value={state.link.value}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "link", value: text })
              }
            />
          </View>

          <View style={{ ...formStyles.buttonView, marginBottom: 30 }}>
            <Button
              onPress={handleOnSubmit}
              title={t(
                `FORMS.SOCIAL.${!editSocial ? "ADD_SOCIAL" : "EDIT_SOCIAL"}`
              ).toUpperCase()}
              icon={
                <Icon
                  name={!editSocial ? "add" : "edit"}
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

export default AddSocialScreen;
