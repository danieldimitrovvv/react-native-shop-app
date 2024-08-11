import React from "react";
import { useTranslation } from "react-i18next";

// rests
import OrderRest from "../../rests/secure/OrderRest";

export default function useDeleteOrderHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [effectedRows, setEffectedRows] = React.useState<number>(-1);

  const deleteOrder = React.useCallback(async (id: number) => {
    if (id) {
      setIsLoading(true);
      try {
        const response = await OrderRest.delete(id);
        setEffectedRows(response.data.effectRows);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("order delete error", error);
        setError(t("COMMON.MESSAGES.ORDER_NOT_DELETED"));
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
    deleteOrder,
  };
}
