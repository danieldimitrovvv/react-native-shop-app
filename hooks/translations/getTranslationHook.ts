import React from "react";
import { useTranslation } from "react-i18next";

// rests
import TranslationRest from "../../rests/secure/TranslationRest";
import TranslationModel from "../../models/db/TranslationModel/TranslationModel";

// models

export default function useGetTranslationHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [translation, setTranslation] = React.useState<TranslationModel | null>(
    null
  );

  React.useEffect(() => {
    async function fetchTranslation() {
      if (id) {
        setIsLoading(true);
        try {
          const response = await TranslationRest.getById(id);
          setTranslation(new TranslationModel(response.data));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.log("translation fetch error", error);
          setError(t("FORM.TRANSLATIONS.MESSAGES.TRANSLATION_NOT_FETCHED"));
          setIsLoading(false);
          throw error;
        }
      } else {
        setTranslation(null);
      }
    }
    fetchTranslation();
  }, [id]);

  function clearTranslation() {
    setTranslation(null);
  }
  return {
    isLoading,
    error,
    translation,
    clearTranslation,
  };
}
