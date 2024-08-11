import ResponseModel from "../../ResponseModel/ResponseModel";
import ILogoutResponseModel from "./ILogoutResponseModel";

export default class LogoutResponseModel
  extends ResponseModel
  implements ILogoutResponseModel
{
  public isLogout: boolean;

  constructor();
  constructor(obj?: ILogoutResponseModel);
  constructor(obj?: any) {
    super(obj);
    this.isLogout = (obj && (obj.isLogout || obj.IsLogout)) || false;
  }
}
