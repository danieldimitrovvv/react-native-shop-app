import React from "react";
import { useTranslation } from "react-i18next";

// rests
import UserRest from "../../rests/secure/UserRest";

// models
import IBaseUserModel from "../../models/db/User/BaseUserModel/IBaseUserModel";

export default function useChangeUserPasswordHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<IBaseUserModel | null>(null);

  const changeUserPassword = React.useCallback(
    async ({
      id,
      newPassword,
      userPassword,
    }: {
      id: number;
      newPassword: string;
      userPassword: string;
    }) => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await UserRest.changePassword(
            id,
            userPassword,
            newPassword
          );
          setUser(response.data);
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.log("user change password error", error);
          setError(t("FORMS.USER.MESSAGES.USER_PASSWORD_NOT_CHANGED"));
          setUser(null);
          setIsLoading(false);
          throw error;
        }
      }
    },
    []
  );

  function clearUser() {
    setUser(null);
  }
  return {
    isLoading,
    error,
    user,
    changeUserPassword,
    clearUser,
  };
}
