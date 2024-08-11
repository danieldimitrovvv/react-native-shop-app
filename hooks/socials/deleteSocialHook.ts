import React from "react";
import { useTranslation } from "react-i18next";

// rests
import SocialRest from "../../rests/secure/SocialRest";

export default function useDeleteSocialHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [effectedRows, setEffectedRows] = React.useState<number>(-1);

  const deleteSocial = React.useCallback(async (id: number) => {
    if (id) {
      setIsLoading(true);
      try {
        const response = await SocialRest.delete(id);
        setEffectedRows(response.data.effectRows);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("social delete error", error);
        setError(t("FORMS.SOCIALS.MESSAGES.SOCIAL_NOT_DELETED"));
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
    deleteSocial,
  };
}
