// interfaces
import BaseUserModelI from "./IBaseUserModel";

// types
import RolesTypes from "../../../types/RolesTypes";

// models
import BaseModel from "../../BaseModel/BaseModel";

export default class BaseUserModel extends BaseModel implements BaseUserModelI {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public password: string;
  public role?: RolesTypes;

  constructor();
  constructor(obj?: BaseUserModelI);
  constructor(obj?: any) {
    super(obj);

    this.firstName = (obj && (obj.firstName || obj.FirstName)) || null;
    this.lastName = (obj && (obj.lastName || obj.LastName)) || null;
    this.email = (obj && (obj.email || obj.Email)) || null;
    this.phone = (obj && (obj.phone || obj.Phone)) || null;
    this.password = (obj && (obj.password || obj.Password)) || null;
    this.role = (obj && (obj.role || obj.Role)) || null;
  }
}
