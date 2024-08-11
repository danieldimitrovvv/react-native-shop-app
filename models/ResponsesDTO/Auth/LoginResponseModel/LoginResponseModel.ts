import BaseUserModel from "../../../db/User/BaseUserModel/BaseUserModel";
import IBaseUserModel from "../../../db/User/BaseUserModel/IBaseUserModel";
import ResponseModel from "../../ResponseModel/ResponseModel";
import AuthResponseModel from "../AuthResponseModel/AuthResponseModel";
import IAuthResponseModel from "../AuthResponseModel/IAuthResponseModel";
import ILoginResponseModel from "./ILoginResponseModel";

export default class LoginResponseModel
  extends ResponseModel
  implements ILoginResponseModel
{
  public auth: IAuthResponseModel;
  public user: IBaseUserModel;

  constructor();
  constructor(obj?: ILoginResponseModel);
  constructor(obj?: any) {
    super(obj);
    this.auth =
      (obj && new AuthResponseModel(obj.auth || obj.Auth)) ||
      new AuthResponseModel({} as IAuthResponseModel);

    this.user =
      (obj &&
        new BaseUserModel(
          obj.user || obj.User || obj.operator || obj.Operator
        )) ||
      new BaseUserModel({} as IBaseUserModel);
  }
}
