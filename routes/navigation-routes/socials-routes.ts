import { RouteIconProps, colorTheme } from "./routes-types";

const ADD_SOCIAL_ROUTE = {
  // label: "NAV.ADD_SOCIAL",
  label: "COMMON.ADD",
  key: "AddSocialContacts",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "add",
  },
};

const SOCIAL_LIST = {
  // label: "NAV.SOCIAL_LIST",
  label: "COMMON.LIST",
  key: "SocialContactsList",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "list",
  },
};

export const SOCIALS_ROUTES = {
  label: "NAV.SOCIALS",
  key: "Socials",
  color: colorTheme.color,
  icon: {
    ...RouteIconProps,
    name: "share-social-outline",
    type: "ionicon",
  },

  children: [ADD_SOCIAL_ROUTE, SOCIAL_LIST],
};
