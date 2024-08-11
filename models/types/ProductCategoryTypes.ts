export enum ProductCategoryTypes {
  UNKNOWN = "UNKNOWN",
  SMARTPHONES = "smartphones",
  LAPTOPS = "laptops",
  TABLETS = "tablets",
  WATCHES = "watches",
  ACCESSORIES = "accessories",
  SECOND_HAND = "second_hand",

  // HEADPHONES = "headphones",
  // FRAGRANCES = "fragrances",
  // SKIN_CARE = "skincare",
  // GROCERIES = "groceries",
  // HOME_DECORATION = "home-decoration",
}

export const getProductCategoryTypesIcon = (type: ProductCategoryTypes) => {
  switch (type) {
    case ProductCategoryTypes.SMARTPHONES:
      return undefined;

    case ProductCategoryTypes.LAPTOPS:
      return undefined;

    case ProductCategoryTypes.TABLETS:
      return undefined;

    case ProductCategoryTypes.WATCHES:
      return undefined;

    case ProductCategoryTypes.ACCESSORIES:
      return undefined;

    case ProductCategoryTypes.SECOND_HAND:
      return undefined;

    default:
      return undefined;
  }
};
