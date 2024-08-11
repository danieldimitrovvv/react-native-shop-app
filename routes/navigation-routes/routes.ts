import { PRODUCTS_ROUTES } from "./product-routes";
import { CustomRouteType, RouteIconProps, colorTheme } from "./routes-types";
import { SETTING_LIST } from "./setting-routes";
import { SOCIALS_ROUTES } from "./socials-routes";
import { TRANSLATIONS_ROUTES } from "./translation-routes";
import { USER_ROUTES } from "./user-routes";

const DASHBOARD_ROUTE = {
  label: "NAV.HOME",
  key: "Home",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "home",
    // name: "dashboard",
    // type: "ant-design",
  },
};

const PROFILE_ROUTE = {
  label: "NAV.PROFILE",
  key: "Profile",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "user",
    type: "feather",
  },
};

const ORDER_LIST = {
  label: "NAV.ORDERS",
  key: "OrdersList",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "first-order",
    type: "font-awesome",
  },
};

const MENU_ROUTES = {
  label: "NAV.MENU",
  key: "Menu",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "menu",
  },

  children: [
    DASHBOARD_ROUTE,
    // PROFILE_ROUTE,
    USER_ROUTES,
    PRODUCTS_ROUTES,
    ORDER_LIST,
    SOCIALS_ROUTES,
    TRANSLATIONS_ROUTES,
    SETTING_LIST,
  ],
};

export const CUSTOM_ROUTES: CustomRouteType[] = [...MENU_ROUTES.children];
