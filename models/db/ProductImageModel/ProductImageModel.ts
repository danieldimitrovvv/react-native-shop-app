import BaseModel from "../BaseModel/BaseModel";
import IProductImageModel from "./IProductImageModel";

export default class ProductImageModel
  extends BaseModel
  implements IProductImageModel
{
  public url: string;
  public isMain: boolean;

  constructor();
  constructor(obj?: IProductImageModel);
  constructor(obj?: any) {
    super(obj);

    this.url = (obj && (obj.url || obj.URL)) ?? "";
    this.isMain = obj && (obj.isMain || obj.IsMain);
  }
}
