import { RouteIconProps, colorTheme } from "./routes-types";

const ADD_USER_ROUTE = {
  // label: "NAV.ADD_USER",
  label: "COMMON.ADD",
  key: "AddUser",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "add",
  },
};

const USER_LIST_ROUTE = {
  // label: "NAV.USER_LIST",
  label: "COMMON.LIST",
  key: "UsersList",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "list",
  },
};

export const USER_ROUTES = {
  label: "NAV.USERS",
  key: "Users",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "users",
    type: "feather",
  },

  children: [ADD_USER_ROUTE, USER_LIST_ROUTE],
};
