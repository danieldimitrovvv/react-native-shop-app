import React from "react";
import { useTranslation } from "react-i18next";

// rests
import SocialRest from "../../rests/secure/SocialRest";

// models
import SocialModel from "../../models/db/SocialModel/SocialModel";

// interfaces
import ISocialModel from "../../models/db/SocialModel/ISocialModel";

export default function useCreateUpdateSocialHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [social, setSocial] = React.useState<SocialModel | null>(null);

  const createUpdateSocial = React.useCallback(
    async (data: ISocialModel) => {
      setIsLoading(true);
      try {
        const operationAsync = !id ? SocialRest.create : SocialRest.update;
        const response = await operationAsync({ ...data, id: id ?? 0 });
        setSocial(new SocialModel(response.data));
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log(`social ${!id ? "create" : "update"} error`, error);
        setError(t("FORMS.SOCIALS.MESSAGES.ADDED_NOT_SUCCESSFULLY"));
        setIsLoading(false);
        throw error;
      }
    },
    [id]
  );

  function clearSocial() {
    setSocial(null);
  }

  return {
    isLoading,
    error,
    social,
    createUpdateSocial,
    clearSocial,
  };
}
