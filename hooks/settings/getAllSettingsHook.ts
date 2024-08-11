import React from "react";
import { useTranslation } from "react-i18next";

// models
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import IPageable from "../../models/ui/Pageable/IPageable";

// hooks
import usePageableHook from "../pageableHook";
import SettingsModel from "../../models/db/SettingsModel/SettingsModel";
import SettingsRest from "../../rests/secure/SettingsRest";

type Props = {
  refetchKey?: any;
};
export default function useGetAllSettingsHook({ refetchKey }: Props) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [settings, setSettings] = React.useState<SettingsModel[] | null>(null);

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  const fetchSettings = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const pageable = new PageableModel({ page, rowsPerPage } as IPageable);
      const response = await SettingsRest.getAll(pageable);
      const data = response.data;

      console.log("RESPONSE", data);
      setSettings(data.rows.map((i) => new SettingsModel(i)));
      onChangeCountRows(data.countRows);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log("settings fetch error", error);
      setError(t("COMMON.MESSAGES.SETTINGS_NOT_FETCHED"));
      setIsLoading(false);
      throw error;
    }
  }, [page, rowsPerPage, refetchKey]);

  React.useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    isLoading,
    error,
    settings,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    fetchSettings,
  };
}
