// interfaces
import { IShoppingCartItem } from "../../../store/slices/shopping-cart/shoppingCartSlice";
import OrderStatusTypes from "../../types/OrderStatusTypes";

// models
import BaseModel from "../BaseModel/BaseModel";
import ProductModel from "../ProductModel/ProductModel";
import IOrderModel from "./IOrderModel";

export default class OrderModel extends BaseModel implements IOrderModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  status: OrderStatusTypes;
  cartItems: IShoppingCartItem[];

  constructor();
  constructor(obj?: IOrderModel);
  constructor(obj?: any) {
    super(obj);

    this.firstName = (obj && (obj.firstName || obj.FirstName)) ?? "";
    this.lastName = (obj && (obj.lastName || obj.LastName)) ?? "";
    this.email = (obj && (obj.email || obj.Email)) ?? "";
    this.phone = (obj && (obj.phone || obj.Phone)) ?? "";
    this.address = (obj && (obj.address || obj.Address)) ?? "";
    this.description = (obj && (obj.description || obj.Description)) ?? "";
    this.status =
      (obj && (obj.status || obj.Status)) ?? OrderStatusTypes.UNKNOWN;

    this.cartItems = (obj && (obj.cartItems || obj.CartItems)) ?? [];
    if (this.cartItems.length > 0) {
      this.cartItems = this.cartItems.map(
        (i) =>
          ({ ...i, product: new ProductModel(i.product) } as IShoppingCartItem)
      );
    }
  }

  calculateTotalSum() {
    let sum = 0;

    if (this.cartItems.length > 0) {
      this.cartItems.forEach((item) => {
        let itemSum = item.product.price * item.amount;
        // if set discount price
        if (item.product.discountPrice) {
          itemSum -= item.product.discountPrice;
        }

        // if set discount percentage
        if (item.product.discountPercentage) {
          let itemDiscountPrice =
            (item.product.discountPercentage / 100) * item.product.price;
          itemSum -= itemDiscountPrice * item.amount;
        }

        sum += itemSum;
      });
    }

    return sum;
  }

  calculateTotalDiscountSum() {
    let sum = 0;

    if (this.cartItems.length > 0) {
      this.cartItems.forEach((item) => {
        let itemSum = 0;
        // if set discount price
        if (item.product.discountPrice) {
          itemSum += item.product.discountPrice;
        }

        // if set discount percentage
        if (item.product.discountPercentage) {
          let itemDiscountPrice =
            (item.product.discountPercentage / 100) * item.product.price;
          itemSum += itemDiscountPrice * item.amount;
        }

        sum += itemSum;
      });
    }

    return sum;
  }
}
