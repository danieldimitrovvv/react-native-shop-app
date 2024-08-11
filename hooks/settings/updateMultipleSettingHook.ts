import React from "react";
import { useTranslation } from "react-i18next";

// rests
import SettingsRest from "../../rests/secure/SettingsRest";

// models
import SettingsModel from "../../models/db/SettingsModel/SettingsModel";

// interfaces
import ISettingsModel from "../../models/db/SettingsModel/ISettingsModel";

export default function useUpdateMultipleSettingHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [settings, setSettings] = React.useState<SettingsModel[] | null>(null);

  const updateMultipleSettings = async (data: ISettingsModel[]) => {
    setIsLoading(true);
    try {
      const response = await SettingsRest.updateMultiple(data);
      setSettings(response.data.map((s) => new SettingsModel(s)));
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log(`setting update multiple error`, error);
      setError(t(`FORMS.SETTINGS.MESSAGES.UPDATED_NOT_SUCCESSFULLY`));
      setIsLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    settings,
    updateMultipleSettings,
  };
}
