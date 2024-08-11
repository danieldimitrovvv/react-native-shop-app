import SettingsUtility from "../../../../utilities/SettingsUtility";
import ISettingsStoreModel from "./ISettingsStoreModel";

export default class SettingsStoreModel implements ISettingsStoreModel {
  public withPrice: boolean;
  public withProductAmount: boolean;
  public withCart: boolean;
  public withDiscount: boolean;
  public getLatest: number;
  public autoRedirect: number;
  public productsPerPage: number;

  constructor();
  constructor(obj?: ISettingsStoreModel);
  constructor(obj?: any) {
    this.withPrice = (obj && (obj.withPrice || obj.WithPrice)) || false;
    this.withProductAmount =
      (obj && (obj.withProductAmount || obj.WithProductAmount)) || false;
    this.withCart = (obj && (obj.withCart || obj.WithCart)) || false;
    this.withDiscount =
      (obj && (obj.withDiscount || obj.WithDiscount)) || false;
    this.getLatest =
      (obj && (obj.getLatest || obj.GetLatest)) ||
      SettingsUtility.getLatestNumber();
    this.autoRedirect =
      (obj && (obj.autoRedirect || obj.AutoRedirect)) ||
      SettingsUtility.autoRedirectTime();
    this.productsPerPage =
      (obj && (obj.productsPerPage || obj.ProductsPerPage)) ||
      SettingsUtility.productsPerPage();
  }
}
