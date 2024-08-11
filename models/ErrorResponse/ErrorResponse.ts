import IErrorResponse from "./IErrorResponse";
import MessageShowTypes from "../types/MessageShowTypes";
import StatusTypes from "../types/StatusTypes";

export default class ErrorResponse implements IErrorResponse {
  public showType: MessageShowTypes;
  public status: StatusTypes;
  public statusText: string;
  public error: string;

  constructor();
  constructor(obj?: IErrorResponse);
  constructor(obj?: any) {
    this.showType = (obj && obj.showType) || MessageShowTypes.ALERT;
    this.status = (obj && obj.status) || StatusTypes.OK;
    this.statusText = (obj && obj.statusText) || "";
    this.error = (obj && obj.error) || "";
  }

}
