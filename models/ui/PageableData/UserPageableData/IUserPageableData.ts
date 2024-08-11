import IBaseUserModel from "../../../db/User/BaseUserModel/IBaseUserModel";
import IPageableData from "../IPageableData";

export default interface IUserPageableData
  extends IPageableData<IBaseUserModel> {}
