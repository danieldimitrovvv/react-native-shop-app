import React from "react";
import { useTranslation } from "react-i18next";
import SettingsModel from "../../models/db/SettingsModel/SettingsModel";
import SettingsRest from "../../rests/secure/SettingsRest";

export default function useGetSettingHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [setting, setSetting] = React.useState<SettingsModel | null>(null);

  React.useEffect(() => {
    async function fetchSetting() {
      if (id) {
        setIsLoading(true);
        try {
          const response = await SettingsRest.getById(id);
          setSetting(new SettingsModel(response.data));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.log("setting fetch error", error);
          setError(t("COMMON.MESSAGES.SETTING_NOT_FETCHED"));
          setIsLoading(false);
          throw error;
        }
      } else {
        setSetting(null);
      }
    }
    fetchSetting();
  }, [id]);

  function clearSetting() {
    setSetting(null);
  }

  return {
    isLoading,
    error,
    setting,
    clearSetting,
  };
}
