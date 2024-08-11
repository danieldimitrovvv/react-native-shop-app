import IProductModel from "../../../db/ProductModel/IProductModel";
import IPageableData from "../IPageableData";

export default interface IProductPageableData
  extends IPageableData<IProductModel> {}
