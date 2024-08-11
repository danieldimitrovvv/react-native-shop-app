// interfaces
import BaseUserModelI from "./IUserResponseModel";

// types

// models
import ResponseModel from "../ResponseModel/ResponseModel";
import IUserResponseModel from "./IUserResponseModel";
import RolesTypes from "../../types/RolesTypes";
import OrderModel from "../../db/OrderModel/OrderModel";

export default class UserResponseModel
  extends ResponseModel
  implements IUserResponseModel
{
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public password: string;
  public role?: RolesTypes;

  public orders: OrderModel[];

  constructor();
  constructor(obj?: BaseUserModelI);
  constructor(obj?: any) {
    super(obj);

    this.id = (obj && (obj.id || obj.ID)) || null;
    this.firstName = (obj && (obj.firstName || obj.FirstName)) || null;
    this.lastName = (obj && (obj.lastName || obj.LastName)) || null;
    this.email = (obj && (obj.email || obj.Email)) || null;
    this.phone = (obj && (obj.phone || obj.Phone)) || null;
    this.password = (obj && (obj.password || obj.Password)) || null;
    this.role = (obj && (obj.role || obj.Role)) || null;

    this.orders = (obj && (obj.orders || obj.Orders)) || [];
    this.orders = this.orders?.map((o) => new OrderModel(o));
  }
}
