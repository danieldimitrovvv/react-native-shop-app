// types
import { ProductCurrencyCodeTypes } from "../../types/ProductCurrencyCodeTypes";
import { ProductCategoryTypes } from "../../types/ProductCategoryTypes";

// models
import IProductRequestModel from "./IProductRequestModel";
import IProductImageModel from "../../db/ProductImageModel/IProductImageModel";
import RequestModel from "../RequestModel/RequestModel";
import ProductImageModel from "../../db/ProductImageModel/ProductImageModel";

export default class ProductRequestModel
  extends RequestModel
  implements IProductRequestModel
{
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

  constructor();
  constructor(obj?: IProductRequestModel);
  constructor(obj?: any) {
    super(obj);

    this.id = (obj && (obj.id || obj.ID)) ?? 0;
    this.title = (obj && (obj.title || obj.Title)) ?? "";
    this.description = (obj && (obj.description || obj.Description)) ?? "";
    this.currencyCode =
      (obj && (obj.currencyCode || obj.CurrencyCode)) ??
      ProductCurrencyCodeTypes.UNKNOWN;
    this.price = (obj && (obj.price || obj.Price)) ?? -1;
    this.discountPercentage =
      (obj && (obj.discountPercentage || obj.DiscountPercentage)) ?? 0;
    this.discountPrice = (obj && (obj.discountPrice || obj.DiscountPrice)) ?? 0;
    this.amount = (obj && (obj.amount || obj.Amount)) ?? 0;
    this.brand = (obj && (obj.brand || obj.Brand)) ?? "";
    this.category =
      (obj && (obj.category || obj.Category)) ?? ProductCategoryTypes;
    this.thumbnail = (obj && (obj.thumbnail || obj.Thumbnail)) ?? -1;

    this.images = (obj && (obj.images || obj.Images)) ?? [];
    this.images = this.images.map(
      (i) => new ProductImageModel(i as IProductImageModel)
    );
  }

  getMainImg = (): string => {
    const mainImg = this.images.find((i) => i.isMain);

    const src = mainImg
      ? mainImg.url
      : this.images.length > 0
      ? this.images[0].url
      : "";

    return src;
  };
}
