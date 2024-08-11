import { IShoppingCartItem } from "../../../store/slices/shopping-cart/shoppingCartSlice";
import OrderStatusTypes from "../../types/OrderStatusTypes";
import IBaseModel from "../BaseModel/IBaseModel";
import IProductModel from "../ProductModel/IProductModel";

export default interface IOrderModel extends IBaseModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  status: OrderStatusTypes;
  userID?: string;
  cartItems: IShoppingCartItem[];
}
