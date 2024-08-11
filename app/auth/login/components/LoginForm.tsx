import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// styles
import { formStyles } from "../../../../styles/form";
import { containerStyles } from "../../../../styles/main";

//  hooks
import useLoginHook from "../../../../hooks/loginHook";

// utilities
import LocalStorageUtility from "../../../../utilities/LocalStorageUtility";

// types
import LocalStorageKeyTypes from "../../../../types/LocalStorageKeyTypes";

// components
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import ErrorMessage from "../../../../components/messages/ErrorMessage";
import RootStackParamList from "../../../../types/RootStackParamListTypes";

// images
const logo = require("../../../../assets/images/shop_logo.png");

export default function LoginForm() {
  const { t } = useTranslation();

  const [remember, setRemember] = useState(false);

  const lastLogin = LocalStorageUtility.getObject(
    LocalStorageKeyTypes.LAST_LOGIN_DATA
  );

  const [email, setEmail] = useState((lastLogin as any)?.email ?? "");
  const [password, setPassword] = useState((lastLogin as any)?.password ?? "");

  const { isLoading, error, login } = useLoginHook();

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  async function handleOnSubmit() {
    try {
      const response = await login(email, password);
      LocalStorageUtility.setObject(LocalStorageKeyTypes.LAST_LOGIN_DATA, {
        email,
        password,
      });
      navigator.navigate("Auth");

      // redirect to page
      // switch (response?.user.role) {
      //   case RolesTypes.ADMIN:
      //     navigator(
      //       RouterLinksTypes.ADMIN_PANEL + "/" + RouterLinksTypes.USERS_LIST
      //     );
      //     break;

      //   case RolesTypes.CREATOR:
      //     navigator(
      //       RouterLinksTypes.ADMIN_PANEL + "/" + RouterLinksTypes.PRODUCTS_LIST
      //     );
      //     break;

      //   case RolesTypes.TECHNICIAN:
      //     navigator(
      //       RouterLinksTypes.ADMIN_PANEL + "/" + RouterLinksTypes.ORDERS_LIST
      //     );
      //     break;

      //   default:
      //     navigator(RouterLinksTypes.HOME);
      //     break;
      // }
    } catch (error) {}
  }

  const disableSubmitButton = React.useMemo(
    () => email === "" || password === "" || isLoading,
    [email, password, isLoading]
  );

  return (
    <ScrollView
      style={{
        ...formStyles.container,
      }}
    >
      <View style={containerStyles.containerRowCenter}>
        <Image source={logo} style={formStyles.image} resizeMode="contain" />
      </View>
      <Text style={formStyles.title}>{t("COMMON.LOGIN")}</Text>
      <View style={formStyles.inputView}>
        <TextInput
          style={formStyles.input}
          placeholder={t("FORMS.LOGIN.EMAIL")}
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={formStyles.input}
          placeholder={t("FORMS.LOGIN.PASSWORD")}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      {/* <View style={formStyles.rememberView}>
        <View style={formStyles.switch}>
          <Switch
            value={remember}
            onValueChange={setRemember}
            trackColor={{
              true: palette.primary.main.value,
              false: palette.grey.light.value,
            }}
          />
          <Text style={formStyles.rememberText}>Remember Me</Text>
        </View>
        <View>
          <Pressable onPress={() => Alert.alert("Forget Password!")}>
            <Text style={formStyles.forgetText}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View> */}

      {error && (
        <ErrorMessage
          message={error}
          messageProps={{ style: { paddingVertical: 2, margin: 0 } }}
        />
      )}

      <View style={formStyles.buttonView}>
        <Button
          style={formStyles.button}
          onPress={handleOnSubmit}
          title={t("FORMS.LOGIN.ENTER")}
          disabled={disableSubmitButton}
          loading={isLoading}
        />
      </View>

      {/* <View style={styles.mediaIcons}>
        <Image source={facebook} style={styles.icons} />
        <Image source={tiktok} style={styles.icons} />
        <Image source={linkedin} style={styles.icons} />
      </View> */}

      {/* <Text style={formStyles.footerText}>
        Don't Have Account?<Text style={formStyles.signup}> Sign Up</Text>
      </Text> */}
    </ScrollView>
  );
}
