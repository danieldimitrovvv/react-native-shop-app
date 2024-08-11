import React from "react";
import { useTranslation } from "react-i18next";

// rests
import SocialRest from "../../rests/secure/SocialRest";

// models
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import IPageable from "../../models/ui/Pageable/IPageable";

// hooks
import usePageableHook from "../pageableHook";
import SocialTypes from "../../models/types/SocialTypes";
import SocialModel from "../../models/db/SocialModel/SocialModel";

// types

interface SearchProps {
  searchValue?: string;
  type?: SocialTypes | null;
}
export default function useGetAllSocialsWithFiltersHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [socials, setSocials] = React.useState<SocialModel[] | null>(null);

  const [filters, setFilters] = React.useState<SearchProps>({
    searchValue: "",
    type: null,
  });

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  function handelSetFilters(filters: SearchProps) {
    setFilters(filters);
    onChangePage(0);
  }

  React.useEffect(() => {
    async function fetchSocials() {
      setIsLoading(true);
      try {
        const pageable = new PageableModel({
          page,
          rowsPerPage,
        } as IPageable);
        const response = await SocialRest.getContainsSearchValue(
          filters.searchValue,
          filters.type ?? undefined,
          pageable
        );
        const data = response.data;
        setSocials(data.rows.map((i) => new SocialModel(i)));
        onChangeCountRows(data.countRows);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("social fetch error", error);
        setError(t("FORMS.SOCIALS.MESSAGES.SOCIALS_NOT_FETCHED"));
        setIsLoading(false);
        throw error;
      }
    }

    fetchSocials();
  }, [page, rowsPerPage, filters]);

  return {
    isLoading,
    error,
    socials,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    setFilters: handelSetFilters,
    onChangePage,
    onChangeRowsPerPage,
  };
}
