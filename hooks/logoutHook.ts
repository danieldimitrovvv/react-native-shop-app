import React from "react";
import { useTranslation } from "react-i18next";

// rests
import AuthenticationRest from "../rests/AuthenticationRest";

// types
import RouterLinksTypes from "../models/types/RouterLinksTypes";

// store
import { useDispatch } from "react-redux";
import { logoutLoginUser } from "../store/slices/settings/settingsSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import RootStackParamList from "../types/RootStackParamListTypes";

export default function useLogoutHook() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  async function logout() {
    setIsLoading(true);
    try {
      const response = await AuthenticationRest.logout();
      dispatch(logoutLoginUser());
      setIsLoading(false);
      setError(null);
      // navigator.navigate("Home");
      return response.data;
    } catch (error) {
      console.log("logout error:", error);
      setError(t("COMMON.MESSAGES.FAILED_LOGOUT"));
      setIsLoading(false);
      throw error;
    }
  }

  return {
    isLoading,
    error,
    logout,
  };
}
