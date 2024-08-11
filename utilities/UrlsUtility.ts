import { Platform } from "react-native";
import RouterLinksTypes from "../models/types/RouterLinksTypes";

export default class UrlsUtility {
  static getBaseUrl(): string {
    if (Platform.OS === "web") {
      return window.location.origin;
    } else if (["ios", "android"].includes(Platform.OS)) {
      return process.env.EXPO_PUBLIC_APP_URL ?? "";
    }

    return "";
  }

  static getFullURL(): string {
    if (Platform.OS === "web") {
      return window.location.href;
    } else if (["ios", "android"].includes(Platform.OS)) {
      return process.env.EXPO_PUBLIC_APP_URL ?? "";
    }
    return "";
  }

  static getImageBaseURL(): string {
    if (Platform.OS === "web") {
      return window.location.href;
    } else if (["ios", "android"].includes(Platform.OS)) {
      return process.env.EXPO_PUBLIC_APP_IMG_URL ?? "";
    }
    return "";
  }

  static getApiUrl(): string {
    if (
      process.env.EXPO_PUBLIC_APP_API?.startsWith("http://") ||
      process.env.EXPO_PUBLIC_APP_API?.startsWith("https://")
    ) {
      return process.env.EXPO_PUBLIC_APP_API;
    }

    return UrlsUtility.getBaseUrl() + process.env.EXPO_PUBLIC_APP_API;
  }

  static getProductDetailsUrl(productId: number): string {
    return (
      UrlsUtility.getBaseUrl() +
      RouterLinksTypes.PRODUCT_DETAILS.replace(":id", productId.toString())
    );
  }
}
