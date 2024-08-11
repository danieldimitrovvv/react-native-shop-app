import React from "react";
import ProductRest from "../../rests/secure/ProductRest";
import ProductModel from "../../models/db/ProductModel/ProductModel";
import { useTranslation } from "react-i18next";

export default function useConvertProductImagesHook(id: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<ProductModel | null>(null);

  const convertImages = React.useCallback(async () => {
    if (id) {
      setIsLoading(true);
      try {
        const response = await ProductRest.convertImages(id);
        setProduct(new ProductModel(response.data));
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("product images convert error", error);
        setError(t("COMMON.MESSAGES.PRODUCT_IMAGES_NOT_CONVERTED"));
        setIsLoading(false);
        throw error;
      }
    }
  }, [id]);

  return {
    isLoading,
    error,
    convertImages,
    product,
  };
}
