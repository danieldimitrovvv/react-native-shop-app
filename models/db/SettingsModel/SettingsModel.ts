// interfaces
import ISettingsModel from "./ISettingsModel";
import IOrderModel from "./ISettingsModel";

// models
import BaseModel from "../BaseModel/BaseModel";

export default class SettingsModel extends BaseModel implements ISettingsModel {
  key: string;
  value: string;

  constructor();
  constructor(obj?: IOrderModel);
  constructor(obj?: any) {
    super(obj);

    this.key = (obj && (obj.key || obj.Key)) ?? "";
    this.value = (obj && (obj.value || obj.Value)) ?? "";
  }
}
