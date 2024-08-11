import IPageable from "./IPageable";

export default class PageableModel implements IPageable {
  public page: number;
  public rowsPerPage: number;

  constructor();
  constructor(obj?: IPageable);
  constructor(obj?: any) {
    this.page = (obj && obj.page) || 0;
    this.rowsPerPage = (obj && obj.rowsPerPage) || 20;
  }
}
