import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// models
import IBaseUserModel from "../../../models/db/User/BaseUserModel/IBaseUserModel";

//  types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";
import RolesTypes from "../../../models/types/RolesTypes";

//  hooks
import useCreateUpdateUserHook from "../../../hooks/users/createUpdateUserHook";
import useGetUserHook from "../../../hooks/users/getUserHook";

// styles
import palette, { greyColor, successColor } from "../../../styles/colors";
import { formStyles } from "../../../styles/form";
import { containerStyles } from "../../../styles/main";

// store
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";

// routes
import { NavigationProp, useNavigation } from "@react-navigation/native";
import RootStackHeaderTitle from "../../../routes/RootStackHeaderTitle";

// components
import { ActivityIndicator, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import { Button, Icon } from "react-native-elements";
import ErrorMessage from "../../../components/messages/ErrorMessage";
import CreateInput from "../../../components/form/CreateInput";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "AddUser">;

const AddUserScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const navigator = useNavigation<NavigationProp<LeftDrawerStackParamList>>();

  const settingsState = useSettingsState();

  const editUserId = route.params?.id
    ? parseInt(route.params?.id ?? "0")
    : undefined;

  const {
    isLoading: isLoadingEditUser,
    error: errorEditUser,
    user: editUser,
    clearUser: clearEditUser,
  } = useGetUserHook(editUserId);

  const { isLoading, error, createUpdateUser, user, clearUser } =
    useCreateUpdateUserHook(editUser?.id ?? 0);

  function initState(state?: IBaseUserModel | null) {
    return {
      firstName: {
        value: state?.firstName ?? "",
        isValid: (state?.firstName && state?.firstName?.length > 0) || false,
      },
      lastName: {
        value: state?.lastName ?? "",
        isValid: (state?.lastName && state?.lastName?.length > 0) || false,
      },
      email: {
        value: state?.email ?? "",
        isValid: (state?.email && state?.email?.length > 0) || false,
      },
      phone: { value: state?.phone ?? "", isValid: true },
      password: {
        value: state?.password ?? "",
        isValid: (state?.password && state?.password?.length > 0) || false,
      },
      repeatPassword: {
        value: "",
        isValid: true,
      },
      role: {
        value: state?.role ?? RolesTypes.UNKNOWN,
        isValid: state?.role !== RolesTypes.UNKNOWN,
      },
    };
  }
  const [state, setState] = React.useState(
    initState(editUser ?? ({} as IBaseUserModel))
  );

  const [redirectTimeout, setRedirectTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  function clearState() {
    setState(initState({} as IBaseUserModel));
    clearEditUser();
    clearUser();
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
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      email: state.email.value,
      phone: state.phone.value,
      password: state.password.value,
      role: state.role.value,
    } as IBaseUserModel;

    await createUpdateUser(requestData);

    const timeout = setTimeout(() => {
      // clear state
      clearState();
      navigator.navigate("UsersList", {
        refreshTimeStamp: new Date().getMilliseconds(),
      });
    }, settingsState.settings.autoRedirect);

    setRedirectTimeout(timeout);
  }

  React.useEffect(() => {
    if (editUser) {
      navigation.setOptions({
        headerTitle: (props) => (
          <RootStackHeaderTitle
            title={
              editUser ? `${editUser?.firstName} ${editUser?.firstName}` : ""
            }
            titleProps={{
              style: { fontSize: 18, color: palette.primary.main.value },
            }}
          />
        ),
      });

      setState(initState(editUser));
    }
  }, [editUser]);

  React.useEffect(() => {
    return () => {
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [redirectTimeout]);

  React.useEffect(() => {
    if (!route.params?.id) {
      clearEditUser();
    }
  }, [route.params]);

  const roleDropdownData = [
    ...Object.keys(RolesTypes)
      .filter((k) => k !== RolesTypes[RolesTypes.UNKNOWN])
      .map((key) => ({
        title: t("ENUMS.ROLE_TYPES." + key.toUpperCase()),
        key,
      })),
  ];

  const disableSubmitButton = React.useMemo(
    () =>
      !editUser
        ? !state.firstName.isValid ||
          !state.lastName.isValid ||
          !state.email.isValid ||
          !state.phone.isValid ||
          !state.role.isValid ||
          state.role.value === RolesTypes.UNKNOWN ||
          state.password.value !== state.repeatPassword.value
        : !state.firstName.isValid ||
          !state.lastName.isValid ||
          !state.email.isValid ||
          !state.phone.isValid ||
          !state.role.isValid ||
          state.role.value === RolesTypes.UNKNOWN,
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

      {!isLoading && user && (
        <View>
          <Text style={formStyles.title}>
            {user.firstName} - {user.lastName}
          </Text>
          <Text style={formStyles.footerText}>
            {user.email} | {user.phone}
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
            {t("FORMS.USER.MESSAGES.ADDED_SUCCESSFULLY")}
          </Text>

          <View style={{ ...formStyles.buttonView, marginBottom: 10 }}>
            <Button
              onPress={() => {
                clearState();
                if (redirectTimeout) clearTimeout(redirectTimeout);
                navigation.navigate("AddUser", { id: undefined });
              }}
              title={t(`FORMS.USER.ADD_USER`).toUpperCase()}
              icon={<Icon name="add" type="material-icons" color={"#fff"} />}
            />
          </View>
        </View>
      )}

      {!isLoading && !user && (
        <>
          <View
            style={{
              ...containerStyles.containerRowCenter,
              marginBottom: 10,
            }}
          >
            <Text style={{ ...formStyles.title, flex: 1, flexWrap: "wrap" }}>
              {t(`FORMS.USER.${!editUser ? "ADD_USER" : "EDIT_USER"}`)}
            </Text>
          </View>

          <View style={formStyles.inputView}>
            <CreateInput
              placeholder={t("FORMS.USER.FIRST_NAME")}
              value={state.firstName.value}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "firstName", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.USER.LAST_NAME")}
              value={state.lastName.value}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "lastName", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.USER.EMAIL")}
              value={state.email.value}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "email", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.USER.PHONE")}
              value={state.phone.value}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "phone", value: text })
              }
            />

            <SelectDropdown
              data={roleDropdownData}
              onSelect={(selectedItem, index) => {
                onChangeInputHandler({
                  name: "role",
                  value:
                    RolesTypes[selectedItem.key as keyof typeof RolesTypes],
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
                        t("FORMS.USER.MESSAGES.SELECT_ROLE")}
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
              defaultValueByIndex={roleDropdownData.findIndex(
                (c) => c.key === state.role.value.toUpperCase()
              )}
            />

            {!editUser && (
              <>
                <CreateInput
                  placeholder={t("FORMS.USER.PASSWORD")}
                  value={state.password.value}
                  onChangeText={(text) =>
                    onChangeInputHandler({ name: "password", value: text })
                  }
                  secureTextEntry={true}
                />

                <CreateInput
                  placeholder={t("FORMS.USER.REPEAT_PASSWORD")}
                  value={state.repeatPassword.value}
                  onChangeText={(text) =>
                    onChangeInputHandler({
                      name: "repeatPassword",
                      value: text,
                    })
                  }
                  secureTextEntry={true}
                />
              </>
            )}
          </View>

          <View style={{ ...formStyles.buttonView, marginBottom: 30 }}>
            <Button
              onPress={handleOnSubmit}
              title={t(
                `FORMS.USER.${!editUser ? "ADD_USER" : "EDIT_USER"}`
              ).toUpperCase()}
              icon={
                <Icon
                  name={!editUser ? "add" : "edit"}
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

export default AddUserScreen;
