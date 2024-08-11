import React from "react";
import { useTranslation } from "react-i18next";

// rests
import ProductRest from "../../rests/secure/ProductRest";

//  models
import ProductModel from "../../models/db/ProductModel/ProductModel";
import IProductModel from "../../models/db/ProductModel/IProductModel";

export default function useGetLatestsProductsHook(number: number) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<ProductModel[] | null>(null);

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await ProductRest.getLatests(number);
      const data = response.data;

      setProducts(data?.map((i: IProductModel) => new ProductModel(i)) ?? []);
      setIsLoading(false);
      setError(null);
    } catch (error: any) {
      console.log("product fetch error", error);
      setError(t("COMMON.MESSAGES.PRODUCTS_NOT_FETCHED"));
      setIsLoading(false);
      throw error;
    }
  }, [number]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    isLoading,
    error,
    products,
  };
}
