export default interface ISettingsStoreModel {
  withPrice: boolean;
  withProductAmount: boolean;
  withCart: boolean;
  withDiscount: boolean;
  getLatest: number;
  autoRedirect: number;
  productsPerPage: number;
}
