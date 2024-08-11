import IBaseModel from "../BaseModel/IBaseModel";

export default interface IProductImageModel extends IBaseModel {
  url: string;
  isMain: boolean;
}
