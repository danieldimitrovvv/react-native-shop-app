import React from "react";
import { useTranslation } from "react-i18next";

// rests
import UserRest from "../../rests/secure/UserRest";

// models
import BaseUserModel from "../../models/db/User/BaseUserModel/BaseUserModel";
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import IPageable from "../../models/ui/Pageable/IPageable";

// hooks
import usePageableHook from "../pageableHook";

export default function useGetAllUsersHook() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [users, setUsers] = React.useState<BaseUserModel[] | null>(null);

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  const fetchUsers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const pageable = new PageableModel({ page, rowsPerPage } as IPageable);
      const response = await UserRest.getAll(pageable);
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
  }, [page, rowsPerPage]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    isLoading,
    error,
    users,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
  };
}
