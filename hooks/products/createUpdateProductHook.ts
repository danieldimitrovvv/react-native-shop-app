import React from "react";
import ProductRest from "../../rests/secure/ProductRest";
import ProductModel from "../../models/db/ProductModel/ProductModel";
import { useTranslation } from "react-i18next";
import IProductRequestModel from "../../models/RequestDTO/ProductModel/IProductRequestModel";

export default function useCreateUpdateProductHook(id?: number) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<ProductModel | null>(null);

  const createUpdateProduct = React.useCallback(
    async (data: IProductRequestModel) => {
      setIsLoading(true);
      try {
        const operationAsync = !id ? ProductRest.create : ProductRest.update;
        const response = await operationAsync({ ...data, id: id ?? 0 });
        setProduct(new ProductModel(response.data));
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log(`product ${!id ? "create" : "update"} error`, error);
        setError(t("FORMS.PRODUCT.MESSAGES.ADDED_NOT_SUCCESSFULLY"));
        setIsLoading(false);
        throw error;
      }
    },
    [id]
  );

  function clearProduct() {
    setProduct(null);
  }
  return {
    isLoading,
    error,
    product,
    createUpdateProduct,
    clearProduct,
  };
}
