import IAuthResponseModel from "./IAuthResponseModel";

export default class AuthResponseModel implements IAuthResponseModel {
  public token: string;
  public expireMinutes: number;

  constructor();
  constructor(obj?: IAuthResponseModel);
  constructor(obj?: any) {
    this.token = (obj && (obj.token || obj.Token)) || "";
    this.expireMinutes = (obj && (obj.expireMinutes || obj.ExpireMinutes)) || 0;
  }
}
