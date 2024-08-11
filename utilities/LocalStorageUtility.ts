import SyncStorage from "sync-storage";
import { Platform } from "react-native";

export default class LocalStorageUtility {
  static setString = (key: string, value: string) => {
    if (Platform.OS === "web") {
      window.localStorage.setItem(key, value);
    } else if (["ios", "android"].includes(Platform.OS)) {
      SyncStorage.set(key, value);
    }
  };

  static setNumber = (key: string, value: number) => {
    if (Platform.OS === "web") {
      window.localStorage.setItem(key, value?.toString());
    } else if (["ios", "android"].includes(Platform.OS)) {
      SyncStorage.set(key, value?.toString());
    }
  };

  static setBoolean = (key: string, value: boolean) => {
    if (Platform.OS === "web") {
      window.localStorage.setItem(key, value?.toString());
    } else if (["ios", "android"].includes(Platform.OS)) {
      SyncStorage.set(key, value?.toString());
    }
  };

  static setObject = (key: string, value: object) => {
    if (Platform.OS === "web") {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else if (["ios", "android"].includes(Platform.OS)) {
      SyncStorage.set(key, JSON.stringify(value));
    }
  };

  static setArray = (key: string, value: object) => {
    if (Platform.OS === "web") {
      window.localStorage.setItem(
        key,
        JSON.stringify(Array.isArray(value) ? value : [])
      );
    } else if (["ios", "android"].includes(Platform.OS)) {
      SyncStorage.set(key, JSON.stringify(Array.isArray(value) ? value : []));
    }
  };

  static getString = (key: string): string => {
    if (Platform.OS === "web") {
      return window.localStorage.getItem(key) ?? "";
    } else if (["ios", "android"].includes(Platform.OS)) {
      return SyncStorage.get(key) ?? "";
    }

    return "";
  };

  static getNumber = (key: string): number => {
    if (Platform.OS === "web") {
      return parseInt(window.localStorage.getItem(key) ?? "0");
    } else if (["ios", "android"].includes(Platform.OS)) {
      return parseInt(SyncStorage.get(key) ?? "0");
    }

    return 0;
  };

  static getBoolean = (key: string): boolean => {
    if (Platform.OS === "web") {
      return window.localStorage.getItem(key) === "true" ? true : false;
    } else if (["ios", "android"].includes(Platform.OS)) {
      return SyncStorage.get(key) === "true" ? true : false;
    }

    return false;
  };

  static getObject = (key: string): object => {
    if (Platform.OS === "web") {
      return JSON.parse(window.localStorage.getItem(key) ?? "{}");
    } else if (["ios", "android"].includes(Platform.OS)) {
      return JSON.parse(SyncStorage.get(key) ?? "{}");
    }

    return {};
  };

  static getArray = (key: string): object => {
    if (Platform.OS === "web") {
      return JSON.parse(window.localStorage.getItem(key) ?? "[]");
    } else if (["ios", "android"].includes(Platform.OS)) {
      return JSON.parse(SyncStorage.get(key) ?? "[]");
    }

    return [];
  };

  static remove = (key: string) => {
    if (Platform.OS === "web") {
      window.localStorage.removeItem(key);
    } else if (["ios", "android"].includes(Platform.OS)) {
      SyncStorage.remove(key);
    }
  };
}
