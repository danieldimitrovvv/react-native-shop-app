import React from "react";
import { useTranslation } from "react-i18next";

// rests
import SettingsRest from "../../rests/secure/SettingsRest";

// models
import SettingsModel from "../../models/db/SettingsModel/SettingsModel";

// interfaces
import ISettingsModel from "../../models/db/SettingsModel/ISettingsModel";

export default function useCreateUpdateSettingHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [setting, setSetting] = React.useState<SettingsModel | null>(null);

  const createUpdateSetting = React.useCallback(
    async (data: ISettingsModel) => {
      setIsLoading(true);
      try {
        const operationAsync = !id ? SettingsRest.create : SettingsRest.update;
        const response = await operationAsync({ ...data, id: id ?? 0 });
        setSetting(new SettingsModel(response.data));
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log(`setting ${!id ? "create" : "update"} error`, error);
        setError(
          t(
            `FORMS.SETTINGS.MESSAGES.${
              !id ? "ADDED" : "UPDATED"
            }_NOT_SUCCESSFULLY`
          )
        );
        setIsLoading(false);
        throw error;
      }
    },
    [id]
  );

  function clearSetting() {
    setSetting(null);
  }
  return {
    isLoading,
    error,
    setting,
    createUpdateSetting,
    clearSetting,
  };
}
