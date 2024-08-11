import IBaseUserModel from "../../../db/User/BaseUserModel/IBaseUserModel";
import IResponseModel from "../../ResponseModel/IResponseModel";
import IAuthResponseModel from "../AuthResponseModel/IAuthResponseModel";

export default interface ILoginResponseModel extends IResponseModel {
  auth: IAuthResponseModel;
  user: IBaseUserModel;
}
