import React from "react";
import { useTranslation } from "react-i18next";

// rests
import SocialRest from "../../rests/secure/SocialRest";
import SocialModel from "../../models/db/SocialModel/SocialModel";

// models

export default function useGetSocialHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [social, setSocial] = React.useState<SocialModel | null>(null);

  React.useEffect(() => {
    async function fetchSocial() {
      if (id) {
        setIsLoading(true);
        try {
          const response = await SocialRest.getById(id);
          setSocial(new SocialModel(response.data));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.log("social fetch error", error);
          setError(t("FORM.SOCIAL.MESSAGES.SOCIAL_NOT_FETCHED"));
          setIsLoading(false);
          throw error;
        }
      } else {
        setSocial(null);
      }
    }
    fetchSocial();
  }, [id]);

  function clearSocial() {
    setSocial(null);
  }

  return {
    isLoading,
    error,
    social,
    clearSocial,
  };
}
