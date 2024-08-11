import { IShoppingCartItem } from "../../../store/slices/shopping-cart/shoppingCartSlice";
import { ProductCategoryTypes } from "../../types/ProductCategoryTypes";
import { ProductCurrencyCodeTypes } from "../../types/ProductCurrencyCodeTypes";
import IBaseModel from "../BaseModel/IBaseModel";
import IProductImageModel from "../ProductImageModel/IProductImageModel";

export default interface IProductModel extends IBaseModel {
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
  inOrder?: boolean;
}
