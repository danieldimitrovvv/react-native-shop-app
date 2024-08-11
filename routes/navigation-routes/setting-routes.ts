import { RouteIconProps, colorTheme } from "./routes-types";

const ADD_SETTING_ROUTE = {
  // label: "NAV.ADD_SETTING",
  label: "COMMON.ADD",
  key: "AddSetting",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "add",
  },
};

export const SETTING_LIST = {
  label: "NAV.SETTINGS",
  // label: "COMMON.LIST",
  key: "SettingsList",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    // name: "list",
    name: "settings",
    type: "simple-line-icon",
  },
};

export const SETTINGS_ROUTES = {
  label: "NAV.SETTINGS",
  key: "Settings",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "settings",
    type: "simple-line-icon",
  },

  children: [ADD_SETTING_ROUTE, SETTING_LIST],
};
