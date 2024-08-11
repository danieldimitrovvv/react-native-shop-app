import React from "react";
import { useTranslation } from "react-i18next";

// rests
import UserRest from "../../rests/secure/UserRest";

// models
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import IPageable from "../../models/ui/Pageable/IPageable";

// hooks
import usePageableHook from "../pageableHook";

// types
import RolesTypes from "../../models/types/RolesTypes";
import BaseUserModel from "../../models/db/User/BaseUserModel/BaseUserModel";

interface SearchProps {
  searchValue?: string;
  role?: RolesTypes | null;
}
export default function useGetAllUsersWithFiltersHook() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [users, setUsers] = React.useState<BaseUserModel[] | null>(null);

  const [filters, setFilters] = React.useState<SearchProps>({
    searchValue: "",
    role: null,
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
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const pageable = new PageableModel({
          page,
          rowsPerPage,
        } as IPageable);
        const response = await UserRest.getContainsSearchValue(
          filters.searchValue,
          filters.role ?? undefined,
          pageable
        );
        const data = response.data;
        setUsers(data.rows.map((i) => new BaseUserModel(i)));
        onChangeCountRows(data.countRows);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.log("user fetch error", error);
        setError(t("FORMS.USER.MESSAGES.USERS_NOT_FETCHED"));
        setIsLoading(false);
        throw error;
      }
    }

    fetchUsers();
  }, [page, rowsPerPage, filters]);

  return {
    isLoading,
    error,
    users,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    setFilters: handelSetFilters,
    onChangePage,
    onChangeRowsPerPage,
  };
}
