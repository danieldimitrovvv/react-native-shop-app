import React from "react";
import { useTranslation } from "react-i18next";

// rests
import SettingsRest from "../../rests/secure/SettingsRest";

// interfaces
import ISettingsStoreModel from "../../store/slices/settings/SettingsStoreModel/ISettingsStoreModel";
import SettingsStoreModel from "../../store/slices/settings/SettingsStoreModel/SettingsStoreModel";

export default function useGetSettingsFromCacheHook() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [settings, setSettings] = React.useState<SettingsStoreModel | null>(
    null
  );

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await SettingsRest.getSettingsFomCache();
        const data = response.data;
        setSettings(new SettingsStoreModel(data as ISettingsStoreModel));
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("settings fetch error", error);
        setError(t("FORMS.SETTINGS.MESSAGES.SETTINGS_NOT_FETCHED"));
        setIsLoading(false);
        throw error;
      }
    }

    fetchData();
  }, []);

  return {
    isLoading,
    error,
    settings,
  };
}
