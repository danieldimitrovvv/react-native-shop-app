// types
import { ProductCurrencyCodeTypes } from "../../types/ProductCurrencyCodeTypes";
import { ProductCategoryTypes } from "../../types/ProductCategoryTypes";

// models
import IProductImageModel from "../ProductImageModel/IProductImageModel";
import ProductImageModel from "../ProductImageModel/ProductImageModel";
import BaseModel from "../BaseModel/BaseModel";
import IProductModel from "./IProductModel";
import { IShoppingCartItem } from "../../../store/slices/shopping-cart/shoppingCartSlice";

export default class ProductModel extends BaseModel implements IProductModel {
  title: string;
  description: string;
  currencyCode: ProductCurrencyCodeTypes;
  price: number;
  discountPercentage: number;
  discountPrice: number;
  views: number;
  isPublish: boolean;
  rating: number;
  amount: number;
  brand: string;
  category: ProductCategoryTypes;
  thumbnail: string;
  images: IProductImageModel[];
  cartItems: IShoppingCartItem[];
  inOrder?: boolean | undefined;

  constructor();
  constructor(obj?: IProductModel);
  constructor(obj?: any) {
    super(obj);

    this.title = (obj && (obj.title || obj.Title)) ?? "";
    this.description = (obj && (obj.description || obj.Description)) ?? "";
    this.currencyCode =
      (obj && (obj.currencyCode || obj.CurrencyCode)) ??
      ProductCurrencyCodeTypes.UNKNOWN;
    this.price = (obj && (obj.price || obj.Price)) ?? 0;
    this.discountPercentage =
      (obj && (obj.discountPercentage || obj.DiscountPercentage)) ?? 0;
    this.discountPrice = (obj && (obj.discountPrice || obj.DiscountPrice)) ?? 0;
    this.views = (obj && (obj.views || obj.Views)) ?? 0;
    this.isPublish = (obj && (obj.isPublish || obj.IsPublish)) ?? false;
    this.rating = (obj && (obj.rating || obj.Rating)) ?? 0;
    this.amount = (obj && (obj.amount || obj.Amount)) ?? 0;
    this.brand = (obj && (obj.brand || obj.Brand)) ?? "";
    this.category =
      (obj && (obj.category || obj.Category)) ?? ProductCategoryTypes;
    this.thumbnail = (obj && (obj.thumbnail || obj.Thumbnail)) ?? "";

    this.images = (obj && (obj.images || obj.Images)) ?? [];
    this.images = this.images.map(
      (i) => new ProductImageModel(i as IProductImageModel)
    );

    this.cartItems = (obj && (obj.cartItems || obj.CartItems)) ?? [];

    this.inOrder = this.cartItems.length > 0;
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

  getMainImgIndex = (): number => {
    const mainImgIndex = this.images.findIndex((i) => i.isMain);

    const index =
      mainImgIndex != -1 ? mainImgIndex : this.images.length > 0 ? 0 : -1;

    return index;
  };
}
