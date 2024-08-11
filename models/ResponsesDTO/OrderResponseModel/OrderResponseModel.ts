// interfaces
import { IShoppingCartItem } from "../../../store/slices/shopping-cart/shoppingCartSlice";
import BaseUserModel from "../../db/User/BaseUserModel/BaseUserModel";
import OrderStatusTypes from "../../types/OrderStatusTypes";

// models
import ResponseModel from "../ResponseModel/ResponseModel";
import IOrderResponseModel from "./IOrderResponseModel";

export default class OrderResponseModel
  extends ResponseModel
  implements IOrderResponseModel
{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  status: OrderStatusTypes;
  userId?: number;
  user: BaseUserModel;
  cartItems: IShoppingCartItem[];

  constructor();
  constructor(obj?: IOrderResponseModel);
  constructor(obj?: any) {
    super(obj);

    this.id = (obj && (obj.id || obj.ID)) ?? 0;
    this.firstName = (obj && (obj.firstName || obj.FirstName)) ?? "";
    this.lastName = (obj && (obj.lastName || obj.LastName)) ?? "";
    this.email = (obj && (obj.email || obj.Email)) ?? "";
    this.phone = (obj && (obj.phone || obj.Phone)) ?? "";
    this.address = (obj && (obj.address || obj.Address)) ?? "";
    this.description = (obj && (obj.description || obj.Description)) ?? "";
    this.status =
      (obj && (obj.status || obj.Status)) ?? OrderStatusTypes.UNKNOWN;

    this.userId = (obj && (obj.userId || obj.UserId)) ?? 0;

    this.user = (obj && (obj.user || obj.User)) ?? null;
    if (this.user) {
      this.user = new BaseUserModel(this.user);
    }

    this.cartItems = (obj && (obj.cartItems || obj.CartItems)) ?? [];
    if (this.cartItems.length > 0) {
      this.cartItems = this.cartItems.map((i) => i as IShoppingCartItem);
    }
  }
}
