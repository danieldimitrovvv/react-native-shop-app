import React from "react";
import { useTranslation } from "react-i18next";

// rests
import TranslationRest from "../../rests/secure/TranslationRest";

// models
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import IPageable from "../../models/ui/Pageable/IPageable";

// hooks
import usePageableHook from "../pageableHook";
import TranslationModel from "../../models/db/TranslationModel/TranslationModel";

type Props = {
  refetchKey?: number;
};

export default function useGetAllTranslationsHook({ refetchKey }: Props) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [translations, setTranslations] = React.useState<
    TranslationModel[] | null
  >(null);

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  const fetchTranslations = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const pageable = new PageableModel({ page, rowsPerPage } as IPageable);
      const response = await TranslationRest.getAll(pageable);
      const data = response.data;
      setTranslations(data.rows.map((i) => new TranslationModel(i)));
      onChangeCountRows(data.countRows);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log("translation fetch error", error);
      setError(t("FORMS.TRANSLATIONS.MESSAGES.TRANSLATIONS_NOT_FETCHED"));
      setIsLoading(false);
      throw error;
    }
  }, [page, rowsPerPage, refetchKey]);

  React.useEffect(() => {
    fetchTranslations();
  }, [fetchTranslations]);

  return {
    isLoading,
    error,
    translations,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    fetchTranslations,
  };
}
