import React from "react";
import ProductRest from "../../rests/secure/ProductRest";
import ProductModel from "../../models/db/ProductModel/ProductModel";
import PageableModel from "../../models/ui/Pageable/PageableModel";
import IPageable from "../../models/ui/Pageable/IPageable";
import { ProductCategoryTypes } from "../../models/types/ProductCategoryTypes";
import usePageableHook from "../pageableHook";
import { useTranslation } from "react-i18next";
import IProductsFilterRequestModel from "../../models/RequestDTO/ProductsFilterModel/IProductsFilterRequestModel";
import ProductsFilterRequestModel from "../../models/RequestDTO/ProductsFilterModel/ProductsFilterRequestModel";
import { ProductBrandTypes } from "../../models/types/ProductBrandTypes";

type Props = {
  withAll?: boolean;
};

export default function useGetAllProductsWithFiltersHook({
  withAll = false,
}: Props) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<ProductModel[] | null>(null);

  const [filters, setFilters] = React.useState<IProductsFilterRequestModel>({
    searchVal: "",
    category: null,
  });

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    setRowsPerPage,
    setPage,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  function handelSetFilters(filters: IProductsFilterRequestModel) {
    setFilters(filters);
    onChangePage(0);
  }

  React.useEffect(() => {
    async function fetchProducts() {
      if (
        withAll ||
        (filters.searchVal && filters.searchVal !== "") ||
        (filters.category &&
          filters.category != ProductCategoryTypes.UNKNOWN) ||
        (filters.brand && filters.brand != ProductBrandTypes.UNKNOWN)
      ) {
        setIsLoading(true);
        try {
          const pageable = new PageableModel({
            page,
            rowsPerPage,
          } as IPageable);
          const response = await ProductRest.getByFilters(
            new ProductsFilterRequestModel(filters),
            pageable
          );
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
      }
    }

    fetchProducts();
  }, [page, rowsPerPage, filters, withAll]);

  return {
    isLoading,
    error,
    products,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    setFilters: handelSetFilters,
    setRowsPerPage,
    setPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}
