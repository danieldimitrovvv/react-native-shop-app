import React from "react";
import ProductRest from "../../rests/secure/ProductRest";
import ProductModel from "../../models/db/ProductModel/ProductModel";
import { useTranslation } from "react-i18next";

export default function useGetProductHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<ProductModel | null>(null);

  React.useEffect(() => {
    async function fetchProduct() {
      if (id) {
        setIsLoading(true);
        try {
          const response = await ProductRest.getById(id);
          setProduct(new ProductModel(response.data));
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.log("product fetch error", error);
          setError(t("MESSAGES.PRODUCT_NOT_FETCHED"));
          setIsLoading(false);
          throw error;
        }
      } else {
        setProduct(null);
      }
    }
    fetchProduct();
  }, [id]);

  function clearProduct() {
    setProduct(null);
  }
  return {
    isLoading,
    error,
    product,
    clearProduct,
  };
}
