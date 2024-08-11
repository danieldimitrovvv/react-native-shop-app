import React from "react";
import UserRest from "../../rests/secure/UserRest";
import { useTranslation } from "react-i18next";
import IBaseUserModel from "../../models/db/User/BaseUserModel/IBaseUserModel";
import BaseUserModel from "../../models/db/User/BaseUserModel/BaseUserModel";

export default function useCreateUpdateUserHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<BaseUserModel | null>(null);

  const createUpdateUser = React.useCallback(
    async (data: IBaseUserModel) => {
      setIsLoading(true);
      try {
        const operationAsync = !id ? UserRest.addUser : UserRest.updateUser;
        const response = await operationAsync({ ...data, id: id ?? 0 });
        setUser(new BaseUserModel(response.data));
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log(`user ${!id ? "create" : "update"} error`, error);
        setError(t("FORMS.USER.MESSAGES.ADDED_NOT_SUCCESSFULLY"));
        setIsLoading(false);
        throw error;
      }
    },
    [id]
  );

  function clearUser() {
    setUser(null);
  }

  return {
    isLoading,
    error,
    user,
    createUpdateUser,
    clearUser,
  };
}
