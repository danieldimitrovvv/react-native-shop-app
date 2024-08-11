import React from "react";
import ProductRest from "../../rests/secure/ProductRest";
import ProductModel from "../../models/db/ProductModel/ProductModel";
import { useTranslation } from "react-i18next";

export default function usePublishProductHook(id: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<ProductModel | null>(null);

  const publish = React.useCallback(
    async (isPublish: boolean) => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await ProductRest.publish(id, isPublish);
          setProduct(new ProductModel(response.data));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.log("product publish error", error);
          setError(t("COMMON.MESSAGES.PRODUCT_NOT_PUBLISHED"));
          setIsLoading(false);
          throw error;
        }
      }
    },
    [id]
  );

  return {
    isLoading,
    error,
    publish,
    product,
  };
}
