import IOrderResponseModel from "../../../ResponsesDTO/OrderResponseModel/IOrderResponseModel";
import IPageableData from "../IPageableData";

export default interface IOrderPageableData
  extends IPageableData<IOrderResponseModel> {}
