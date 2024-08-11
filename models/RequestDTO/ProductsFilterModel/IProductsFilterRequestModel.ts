import { ProductBrandTypes } from "../../types/ProductBrandTypes";
import { ProductCategoryTypes } from "../../types/ProductCategoryTypes";
import IRequestModel from "../RequestModel/IRequestModel";

export default interface IProductsFilterRequestModel extends IRequestModel {
  searchVal?: string;
  category?: ProductCategoryTypes | null;
  brand?: ProductBrandTypes | null;
}
