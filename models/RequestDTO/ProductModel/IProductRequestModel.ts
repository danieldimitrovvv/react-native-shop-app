import IProductImageModel from "../../db/ProductImageModel/IProductImageModel";
import { ProductCategoryTypes } from "../../types/ProductCategoryTypes";
import { ProductCurrencyCodeTypes } from "../../types/ProductCurrencyCodeTypes";
import IRequestModel from "../RequestModel/IRequestModel";

export default interface IProductRequestModel extends IRequestModel {
  id: number;
  title: string;
  description: string;
  currencyCode: ProductCurrencyCodeTypes;
  price: number;
  discountPercentage: number;
  discountPrice: number;
  amount: number;
  brand: string;
  category: ProductCategoryTypes;
  thumbnail: string;
  images: IProductImageModel[];
}
