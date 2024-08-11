import BaseUserModel from "../../../db/User/BaseUserModel/BaseUserModel";
import IBaseUserModel from "../../../db/User/BaseUserModel/IBaseUserModel";
import IUserPageableData from "./IUserPageableData";

export default class UserPageableData implements IUserPageableData {
  public rows: IBaseUserModel[];
  public countRows: number;

  constructor();
  constructor(obj?: IUserPageableData);
  constructor(obj?: any) {
    this.rows = (obj && obj.rows) || [];
    this.rows = this.rows.map((i) => new BaseUserModel(i));

    this.countRows = (obj && obj.countRows) || 0;
  }
}
