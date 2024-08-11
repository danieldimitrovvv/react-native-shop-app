import ILoginRequestModel from "./ILoginRequestModel";
import RequestModel from "../../RequestModel/RequestModel";

export default class LoginRequestModel
  extends RequestModel
  implements ILoginRequestModel {
  public email: string;
  public password: string;

  constructor();
  constructor(obj?: ILoginRequestModel);
  constructor(obj?: any) {
    super();
    this.email = obj && obj.email;
    this.password = obj && obj.password;
  }
}
