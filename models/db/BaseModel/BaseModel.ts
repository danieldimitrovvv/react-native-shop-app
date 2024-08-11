import IBaseModel from "./IBaseModel";

export default class BaseModel implements IBaseModel {
  public id: number;

  constructor();
  constructor(obj?: IBaseModel);
  constructor(obj?: any) {
    this.id = (obj && (obj.id || obj.ID)) || 0;
  }

}
