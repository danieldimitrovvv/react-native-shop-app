import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// models
import IBaseUserModel from "../../../models/db/User/BaseUserModel/IBaseUserModel";

//  types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

//  hooks
import useChangeUserPasswordHook from "../../../hooks/users/changeUserPasswordHook";
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
import { Button, Icon } from "react-native-elements";
import ErrorMessage from "../../../components/messages/ErrorMessage";
import CreateInput from "../../../components/form/CreateInput";
import UserCard from "../../../components/cards/UserCard/UserCard";

type Props = NativeStackScreenProps<
  LeftDrawerStackParamList,
  "ChangeUserPassword"
>;

const ChangePasswordUserScreen = ({ navigation, route }: Props) => {
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

  const {
    user: updatedUser,
    error,
    isLoading,
    changeUserPassword,
  } = useChangeUserPasswordHook();

  function initState(state?: IBaseUserModel | null) {
    return {
      loginUserPassword: {
        value: "",
        isValid: false,
      },
      password: {
        value: state?.password ?? "",
        isValid: (state?.password && state?.password?.length > 0) || false,
      },
      repeatPassword: {
        value: "",
        isValid: true,
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
      newPassword: state.password.value,
      userPassword: state.loginUserPassword.value,
      id: editUserId ?? 0,
    };

    await changeUserPassword(requestData);

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

  const disableSubmitButton = React.useMemo(
    () =>
      !state.password.value ||
      !state.repeatPassword.value ||
      state.password.value !== state.repeatPassword.value,
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

      {!isLoading && updatedUser && (
        <View>
          <Text style={formStyles.title}>
            {updatedUser.firstName} - {updatedUser.lastName}
          </Text>
          <Text style={formStyles.footerText}>
            {updatedUser.email} | {updatedUser.phone}
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
            {t("FORMS.USER.MESSAGES.USER_PASSWORD_CHANGED")}
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

      {!isLoading && !updatedUser && (
        <>
          {editUser && (
            <View
              style={{
                ...containerStyles.containerRow,
                marginBottom: 10,
                width: "100%",
                flex: 1,
                justifyContent: "stretch",
              }}
            >
              <UserCard user={editUser} />
            </View>
          )}

          <View style={formStyles.inputView}>
            <CreateInput
              placeholder={t("FORMS.USER.LOGIN_USER_PASSWORD")}
              value={state.loginUserPassword.value}
              secureTextEntry={true}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "loginUserPassword", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.USER.PASSWORD")}
              value={state.password.value}
              secureTextEntry={true}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "password", value: text })
              }
            />

            <CreateInput
              placeholder={t("FORMS.USER.REPEAT_PASSWORD")}
              value={state.repeatPassword.value}
              secureTextEntry={true}
              onChangeText={(text) =>
                onChangeInputHandler({ name: "repeatPassword", value: text })
              }
            />
          </View>

          <View style={{ ...formStyles.buttonView, marginBottom: 30 }}>
            <Button
              onPress={handleOnSubmit}
              title={t(`FORMS.USER.EDIT_USER`).toUpperCase()}
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

export default ChangePasswordUserScreen;
