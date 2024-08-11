import SecureRequestModelI from "./ISecureRequestModel";
import RequestModel from "../RequestModel/RequestModel";
import AuthenticationService from "@/services/AuthenticationService";

export default class SecureRequestModel
  extends RequestModel
  implements SecureRequestModelI
{
  public token: string;

  constructor();
  constructor(obj?: SecureRequestModelI);
  constructor(obj?: any) {
    super(obj);
    this.token = (obj && obj.token) || AuthenticationService.token;
  }
}
