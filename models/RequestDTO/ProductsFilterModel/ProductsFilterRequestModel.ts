// types
import { ProductCategoryTypes } from "../../types/ProductCategoryTypes";
import { ProductBrandTypes } from "../../types/ProductBrandTypes";

// models
import RequestModel from "../RequestModel/RequestModel";
import IProductsFilterRequestModel from "./IProductsFilterRequestModel";

export default class ProductsFilterRequestModel
  extends RequestModel
  implements IProductsFilterRequestModel
{
  searchVal?: string;
  brand?: ProductBrandTypes | null;
  category?: ProductCategoryTypes | null;

  constructor();
  constructor(obj?: IProductsFilterRequestModel);
  constructor(obj?: any) {
    super(obj);

    this.searchVal = (obj && (obj.searchVal || obj.SearchVal)) ?? "";
    this.brand = (obj && (obj.brand || obj.Brand)) ?? null;
    this.category = (obj && (obj.category || obj.Category)) ?? null;
  }
}
