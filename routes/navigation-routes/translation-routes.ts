import { RouteIconProps, colorTheme } from "./routes-types";

const ADD_TRANSLATION_ROUTE = {
  // label: "NAV.ADD_TRANSLATION",
  label: "COMMON.ADD",
  key: "AddTranslation",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "add",
  },
};

const TRANSLATION_LIST = {
  // label: "NAV.TRANSLATION_LIST",
  label: "COMMON.LIST",
  key: "TranslationsList",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "list",
  },
};

export const TRANSLATIONS_ROUTES = {
  label: "NAV.TRANSLATIONS",
  key: "Translations",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "g-translate",
    type: "material-icons",
  },

  children: [ADD_TRANSLATION_ROUTE, TRANSLATION_LIST],
};
