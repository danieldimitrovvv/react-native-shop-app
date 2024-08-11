import React from "react";
import { useSettingsState } from "../store/slices/settings/settingsSlice";
import SettingsUtility from "../utilities/SettingsUtility";

export default function usePageableHook() {
  const settingsState = useSettingsState();

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(
    settingsState.settings?.productsPerPage ?? SettingsUtility.productsPerPage()
  );
  const [countRows, setCountRows] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(0);

  function onChangePage(newPage: number) {
    setPage(newPage);
  }

  function onChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const val = parseInt(event.target.value, 10);
    setRowsPerPage(val);
    setPage(0);
    setTotalPages(Math.ceil(countRows / val));
  }

  function onChangeCountRows(rows: number) {
    setCountRows(rows);
    setTotalPages(Math.ceil(rows / rowsPerPage));
  }

  React.useEffect(() => {
    setRowsPerPage(settingsState.settings?.productsPerPage);
  }, [settingsState.settings?.productsPerPage]);

  return {
    page,
    rowsPerPage,
    countRows,
    totalPages: totalPages,
    setRowsPerPage,
    setPage,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  };
}
