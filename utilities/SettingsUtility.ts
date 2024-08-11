export default class SettingsUtility {
  static withPrice(): boolean {
    return process.env.EXPO_PUBLIC_WITH_PRICE === "true";
  }

  static withProductAmount(): boolean {
    return process.env.EXPO_PUBLIC_WITH_PRODUCT_AMOUNT === "true";
  }

  static withCart(): boolean {
    return process.env.EXPO_PUBLIC_WITH_CART === "true";
  }

  static withDiscount(): boolean {
    return process.env.EXPO_PUBLIC_WITH_DISCOUNT === "true";
  }

  static getLatestNumber(): number {
    return parseInt(process.env.EXPO_PUBLIC_GET_LATEST ?? "10");
  }

  static autoRedirectTime(): number {
    return parseInt(process.env.EXPO_PUBLIC_AUTO_REDIRECT ?? "5000");
  }

  static productsPerPage(): number {
    return parseInt(process.env.EXPO_PUBLIC_PRODUCT_PER_PAGE ?? "20");
  }

  static appTabTitle(): string {
    return process.env.EXPO_PUBLIC_TAB_TITLE ?? "shop-app";
  }
}
