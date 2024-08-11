import React from "react";
import AuthenticationRest from "../rests/AuthenticationRest";
import LoginRequestModel from "../models/RequestDTO/Auth/LoginRequestModel/LoginRequestModel";
import ILoginResponseModel from "../models/ResponsesDTO/Auth/LoginResponseModel/ILoginResponseModel";
import LoginRequestModelI from "../models/RequestDTO/Auth/LoginRequestModel/ILoginRequestModel";
import { useTranslation } from "react-i18next";
import LoginResponseModel from "../models/ResponsesDTO/Auth/LoginResponseModel/LoginResponseModel";
import { useDispatch } from "react-redux";
import { setSettingsLoginUser } from "../store/slices/settings/settingsSlice";
import IBaseUserModel from "../models/db/User/BaseUserModel/IBaseUserModel";

export default function useLoginHook() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loginData, setLoginData] = React.useState<LoginResponseModel | null>(
    null
  );

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const response = await AuthenticationRest.login(
        new LoginRequestModel({ email, password } as LoginRequestModelI)
      );
      setLoginData(new LoginResponseModel(response.data));
      dispatch(setSettingsLoginUser(response.data?.user as IBaseUserModel));
      setIsLoading(false);
      setError(null);

      return new LoginResponseModel(response.data);
    } catch (error) {
      console.log("login error:", error);
      setError(t("FORMS.LOGIN.MESSAGES.WRONG_DATA"));
      setIsLoading(false);
      throw error;
    }
  }

  return {
    isLoading,
    error,
    loginData,
    login,
  };
}
