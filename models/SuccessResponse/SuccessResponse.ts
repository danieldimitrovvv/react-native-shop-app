import SuccessResponseI from "./SuccessResponseI";
import MessageShowTypes from "../types/MessageShowTypes";
import StatusTypes from "../types/StatusTypes";

export default class SuccessResponse implements SuccessResponseI {
  public showType: MessageShowTypes;
  public message: string;

  constructor();
  constructor(obj?: SuccessResponseI);
  constructor(obj?: any) {
    this.showType = (obj && obj.showType) || MessageShowTypes.ALERT;
    this.message = (obj && obj.message) || null;
  }

}
