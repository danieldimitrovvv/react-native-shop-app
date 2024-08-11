import RolesTypes from "../../../types/RolesTypes";
import IBaseModel from "../../BaseModel/IBaseModel";

export default interface IBaseUserModel extends IBaseModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: RolesTypes;
}
