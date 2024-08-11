import React from "react";
import { useTranslation } from "react-i18next";

// rests
import UserRest from "../../rests/secure/UserRest";

export default function useDeleteUserHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [effectedRows, setEffectedRows] = React.useState<number>(-1);

  const deleteUser = React.useCallback(async (id: number) => {
    if (id) {
      setIsLoading(true);
      try {
        const response = await UserRest.deleteUser(id);
        setEffectedRows(response.data.effectRows);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("user delete error", error);
        setError(t("FORMS.USER.MESSAGES.USER_NOT_DELETED"));
        setEffectedRows(-1);
        setIsLoading(false);
        throw error;
      }
    }
  }, []);

  return {
    isLoading,
    error,
    effectedRows,
    deleteUser,
  };
}
