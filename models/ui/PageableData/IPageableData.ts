export default interface IPageableData<RowT> {
  rows: RowT[];
  countRows: number;
}
