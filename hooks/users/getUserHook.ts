import React from "react";
import { useTranslation } from "react-i18next";

// rests
import UserRest from "../../rests/secure/UserRest";

// models
import UserResponseModel from "../../models/ResponsesDTO/UserResponeModel/UserResponseModel";

export default function useGetUserHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserResponseModel | null>(null);

  React.useEffect(() => {
    async function fetchUser() {
      if (id) {
        setIsLoading(true);
        try {
          const response = await UserRest.getById(id);

          setUser(new UserResponseModel(response.data));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.log("user fetch error", error);
          setError(t("FORM.USER.MESSAGES.USER_NOT_FETCHED"));
          setIsLoading(false);
          throw error;
        }
      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, [id]);

  function clearUser() {
    setUser(null);
  }

  return {
    isLoading,
    error,
    user,
    clearUser,
  };
}
