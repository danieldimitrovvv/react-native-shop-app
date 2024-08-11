import React from "react";
import { useTranslation } from "react-i18next";

// rests

// models
import TranslationModel from "../../models/db/TranslationModel/TranslationModel";

// interfaces
import ITranslationModel from "../../models/db/TranslationModel/ITranslationModel";
import TranslationRest from "../../rests/secure/TranslationRest";

export default function useCreateUpdateTranslationHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [translation, setTranslation] = React.useState<TranslationModel | null>(
    null
  );

  const createUpdateTranslation = React.useCallback(
    async (data: ITranslationModel) => {
      setIsLoading(true);
      try {
        const operationAsync = !id
          ? TranslationRest.create
          : TranslationRest.update;
        const response = await operationAsync({ ...data, id: id ?? 0 });
        setTranslation(new TranslationModel(response.data));
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log(`translation ${!id ? "create" : "update"} error`, error);
        setError(t("FORMS.TRANSLATIONS.MESSAGES.ADDED_NOT_SUCCESSFULLY"));
        setIsLoading(false);
        throw error;
      }
    },
    [id]
  );

  function clearTranslation() {
    setTranslation(null);
  }

  return {
    isLoading,
    error,
    translation,
    createUpdateTranslation,
    clearTranslation,
  };
}
