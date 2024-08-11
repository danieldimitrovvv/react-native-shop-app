import IBaseModel from "../BaseModel/IBaseModel";

export default interface ISettingsModel extends IBaseModel {
  key: string;
  value: string;
}
