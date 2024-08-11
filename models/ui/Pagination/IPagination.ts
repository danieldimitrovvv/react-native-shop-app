export default interface IPagination {
  page: number;
  rowsPerPage: number;
  countRows: number;
  onChangePage: (event: any, newPage: number) => void;
  onChangeRowsPerPage: (event: any) => void;
}
