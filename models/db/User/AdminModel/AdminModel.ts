import BaseUserModelI from "../BaseUserModel/IBaseUserModel";
import BaseUserModel from "../BaseUserModel/BaseUserModel";

import RolesTypes from "../../../types/RolesTypes";

export default class AdminModel extends BaseUserModel implements BaseUserModelI {
  constructor();
  constructor(obj?: BaseUserModelI);
  constructor(obj?: any) {
    obj.role = RolesTypes.ADMIN;
    super(obj);
  }
}
