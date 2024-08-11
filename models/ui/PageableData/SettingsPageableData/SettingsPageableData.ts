import ISettingsModel from "../../../db/SettingsModel/ISettingsModel";
import SettingsModel from "../../../db/SettingsModel/SettingsModel";
import ISettingsPageableData from "./ISettingsPageableData";

export default class SettingsPageableData implements ISettingsPageableData {
  public rows: ISettingsModel[];
  public countRows: number;

  constructor();
  constructor(obj?: ISettingsPageableData);
  constructor(obj?: any) {
    this.rows = (obj && obj.rows) || [];
    this.rows = this.rows.map((i) => new SettingsModel(i));

    this.countRows = (obj && obj.countRows) || 0;
  }
}
