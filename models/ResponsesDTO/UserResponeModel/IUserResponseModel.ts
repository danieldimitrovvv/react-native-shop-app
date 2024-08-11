import IOrderModel from "../../db/OrderModel/IOrderModel";
import IBaseUserModel from "../../db/User/BaseUserModel/IBaseUserModel";
import IResponseModel from "../ResponseModel/IResponseModel";

export default interface IUserResponseModel
  extends IBaseUserModel,
    IResponseModel {
  orders: IOrderModel[];
}
