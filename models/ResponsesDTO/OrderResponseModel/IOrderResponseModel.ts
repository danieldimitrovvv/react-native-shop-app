import { IShoppingCartItem } from "../../../store/slices/shopping-cart/shoppingCartSlice";
import BaseUserModel from "../../db/User/BaseUserModel/BaseUserModel";
import OrderStatusTypes from "../../types/OrderStatusTypes";
import IResponseModel from "../ResponseModel/IResponseModel";

export default interface IOrderResponseModel extends IResponseModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  status: OrderStatusTypes;
  userID?: string;
  user: BaseUserModel;
  cartItems: IShoppingCartItem[];
}
