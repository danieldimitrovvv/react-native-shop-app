import IPagination from "./IPagination";

export default class PaginationModel implements IPagination {
  public page: number;
  public rowsPerPage: number;
  public countRows: number;
  public onChangePage: (event: any, newPage: number) => void;
  public onChangeRowsPerPage: (event: any) => void;

  constructor();
  constructor(obj?: IPagination);
  constructor(obj?: any) {
    this.page = (obj && obj.page) || 0;
    this.rowsPerPage = (obj && obj.rowsPerPage) || 20;
    this.countRows = (obj && obj.countRows) || -1;
    this.onChangePage = (obj && obj.onChangePage) || null;
    this.onChangeRowsPerPage = (obj && obj.onChangeRowsPerPage) || null;
  }
}
