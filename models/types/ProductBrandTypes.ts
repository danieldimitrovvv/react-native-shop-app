export enum ProductBrandTypes {
  UNKNOWN = "UNKNOWN",
  APPLE = "apple",
  HUAWEI = "huawei",
  XIAOMI = "xiaomi",
  SAMSUNG = "samsung",
  OTHERS = "others",
}

export const getProductBrandTypesIcon = (type: ProductBrandTypes): any => {
  switch (type) {
    case ProductBrandTypes.APPLE:
      return { icon: "apple", color: "#fff" };

    case ProductBrandTypes.SAMSUNG:
      return { icon: "samsung", color: "#034ea2" };

    case ProductBrandTypes.HUAWEI:
      return { icon: "huawei", color: "#CF0A2C" };

    case ProductBrandTypes.XIAOMI:
      return { icon: "xiaomi", color: "#ff6700" };

    case ProductBrandTypes.OTHERS:
      return { icon: "others", color: "#000" };

    default:
      return null;
  }
};
