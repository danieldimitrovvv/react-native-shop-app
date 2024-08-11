import React from "react";
import { useTranslation } from "react-i18next";

// rests
import TranslationRest from "../../rests/secure/TranslationRest";

export default function useDeleteTranslationHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [effectedRows, setEffectedRows] = React.useState<number>(-1);

  const deleteTranslation = React.useCallback(async (id: number) => {
    if (id) {
      setIsLoading(true);
      try {
        const response = await TranslationRest.delete(id);
        setEffectedRows(response.data.effectRows);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("translation delete error", error);
        setError(t("FORMS.TRANSLATIONS.MESSAGES.TRANSLATION_NOT_DELETED"));
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
    deleteTranslation,
  };
}
