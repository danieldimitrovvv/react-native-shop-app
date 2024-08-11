import { RouteIconProps, colorTheme } from "./routes-types";

const ADD_PRODUCT_ROUTE = {
  // label: "NAV.ADD_PRODUCT",
  label: "COMMON.ADD",
  key: "AddProduct",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "add",
  },
};

const PRODUCT_LIST = {
  // label: "NAV.PRODUCT_LIST",
  label: "COMMON.LIST",
  key: "ProductsList",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "list",
  },
};

export const PRODUCTS_ROUTES = {
  label: "NAV.PRODUCTS",
  key: "Products",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "product-hunt",
    type: "font-awesome",
  },

  children: [ADD_PRODUCT_ROUTE, PRODUCT_LIST],
};
