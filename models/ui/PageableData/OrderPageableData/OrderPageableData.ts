import IOrderResponseModel from "../../../ResponsesDTO/OrderResponseModel/IOrderResponseModel";
import OrderResponseModel from "../../../ResponsesDTO/OrderResponseModel/OrderResponseModel";
import IOrderPageableData from "./IOrderPageableData";

export default class OrderPageableData implements IOrderPageableData {
  public rows: IOrderResponseModel[];
  public countRows: number;

  constructor();
  constructor(obj?: IOrderPageableData);
  constructor(obj?: any) {
    this.rows = (obj && obj.rows) || [];
    this.rows = this.rows.map((i) => new OrderResponseModel(i));

    this.countRows = (obj && obj.countRows) || 0;
  }
}
