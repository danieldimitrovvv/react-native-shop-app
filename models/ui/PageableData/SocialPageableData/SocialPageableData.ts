import ISocialModel from "../../../db/SocialModel/ISocialModel";
import SocialModel from "../../../db/SocialModel/SocialModel";
import ISocialPageableData from "./ISocialPageableData";

export default class SocialPageableData implements ISocialPageableData {
  public rows: ISocialModel[];
  public countRows: number;

  constructor();
  constructor(obj?: ISocialPageableData);
  constructor(obj?: any) {
    this.rows = (obj && obj.rows) || [];
    this.rows = this.rows.map((i) => new SocialModel(i));

    this.countRows = (obj && obj.countRows) || 0;
  }
}
