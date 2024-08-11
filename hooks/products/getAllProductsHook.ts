import React from "react";
import ProductRest from "../../rests/secure/ProductRest";
import ProductModel from "../../models/db/ProductModel/ProductModel";
import PageableModel from "../../models/ui/Pageable/PageableModel";
import IPageable from "../../models/ui/Pageable/IPageable";
import usePageableHook from "../pageableHook";
import { useTranslation } from "react-i18next";

export default function useGetAllProductsHook() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<ProductModel[] | null>(null);

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const pageable = new PageableModel({ page, rowsPerPage } as IPageable);
      const response = await ProductRest.getAll(pageable);
      const data = response.data;
      setProducts(data.rows.map((i) => new ProductModel(i)));
      onChangeCountRows(data.countRows);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log("product fetch error", error);
      setError(t("COMMON.MESSAGES.PRODUCTS_NOT_FETCHED"));
      setIsLoading(false);
      throw error;
    }
  }, [page, rowsPerPage]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    isLoading,
    error,
    products,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
  };
}
