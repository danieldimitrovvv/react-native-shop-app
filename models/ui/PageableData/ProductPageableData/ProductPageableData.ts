import IProductModel from "../../../db/ProductModel/IProductModel";
import ProductModel from "../../../db/ProductModel/ProductModel";
import IProductPageableData from "./IProductPageableData";

export default class ProductPageableData implements IProductPageableData {
  public rows: IProductModel[];
  public countRows: number;

  constructor();
  constructor(obj?: IProductPageableData);
  constructor(obj?: any) {
    this.rows = (obj && obj.rows) || [];
    this.rows = this.rows.map((i) => new ProductModel(i));

    this.countRows = (obj && obj.countRows) || 0;
  }
}
