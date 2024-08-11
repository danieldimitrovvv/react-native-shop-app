enum RouterLinksTypes {
  HOME = "/",
  LOGIN = "/login",
  ABOUT = "/about",

  GUEST_FINISH_ORDER = "/guest-finish-order",

  PRODUCT_DETAILS = "/product/:id",
  PRODUCTS_BY_CATEGORY = "/product/category/:category",
  PRODUCTS_BY_BRAND = "/product/brand/:brand",
  PRODUCTS_BY_CATEGORY_AND_BRAND = "/product/:category/:brand",

  ADMIN_PANEL = "/admin-panel",

  ORDERS_LIST = "orders-list",

  ADD_PRODUCT = "add-product",
  EDIT_PRODUCT = "edit-product/:id",
  PRODUCTS_LIST = "products-list",

  ADD_USER = "add-user",
  EDIT_USER = "edit-user/:id",
  CHANGE_USER_PASSWORD = "change-user-password/:id",
  USERS_LIST = "users-lists",
  USER_DETAILS = "user/:id",

  EDIT_SETTING = "edit-setting/:id",
  SETTINGS_CLIENT_SETTINGS_LIST = "settings-client-settings-list",
  SETTINGS_LIST = "settings-list",

  ADD_SOCIAL = "add-social",
  EDIT_SOCIAL = "edit-social/:id",
  SOCIALS_LIST = "socials-list",

  ADD_TRANSLATION = "add-translation",
  EDIT_TRANSLATION = "edit-translation/:id",
  TRANSLATIONS_LIST = "translations-list",
}

export default RouterLinksTypes;
