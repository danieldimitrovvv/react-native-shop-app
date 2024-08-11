import React from "react";
import { useTranslation } from "react-i18next";

// rests
import ProductRest from "../../rests/secure/ProductRest";

export default function useDeleteProductHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [effectedRows, setEffectedRows] = React.useState<number>(-1);

  const deleteProduct = React.useCallback(async (id: number) => {
    if (id) {
      setIsLoading(true);
      try {
        const response = await ProductRest.delete(id);
        setEffectedRows(response.data.effectRows);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("product delete error", error);
        setError(t("COMMON.MESSAGES.PRODUCT_NOT_DELETED"));
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
    deleteProduct,
  };
}
