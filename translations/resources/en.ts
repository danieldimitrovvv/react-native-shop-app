export default {
  NAV: {
    HOME: "Home",
    PROFILE: "Profile",
    LOGOUT: "Logout",

    PRODUCTS: "Products",
    ADD_PRODUCT: "Add Product",
    PRODUCTS_LIST: "Products list",

    USERS: "Users",
    ADD_USER: "Add user",
    USERS_LIST: "Users list",
    CHANGE_USER_PASSWORD: "Change user password",

    ORDERS: "Orders",
    ORDERS_LIST: "Orders list",

    SETTINGS: "Settings",
    ADD_SETTING: "Add Setting",
    SETTINGS_CLIENT_SETTINGS_LIST: "Clients settings list",
    SETTINGS_LIST: "Settings list",

    SOCIALS: "Socials",
    ADD_SOCIAL: "Add socials",
    SOCIALS_LIST: "Списък със социални контакти",

    TRANSLATIONS: "Преводи",
    ADD_TRANSLATION: "Добави превод",
    TRANSLATIONS_LIST: "Списък с преводи",
  },

  FORMS: {
    GUEST_ORDER: {
      ORDER: "Order",
      FIRST_NAME: "First name",
      LAST_NAME: "Last name",
      PHONE: "Phone",
      EMAIL: "Email",
      ADDRESS: "city, street, build ",
      DESCRIPTION: "Description",
      SEND_ORDER: "Send order",
      SEND_INQUIRY: "Send inquiry",
      MESSAGES: {
        ORDER_WAS_SENT_SUCCESSFULLY: "Order was sent successfully",
        ORDER_WAS_NOT_SENT_SUCCESSFULLY: "Order was not sent successfully",
        INQUIRY_WAS_SENT_SUCCESSFULLY: "Inquiry was sent successfully",
        INQUIRY_WAS_NOT_SENT_SUCCESSFULLY: "Inquiry was not sent successfully",
      },
    },

    LOGIN: {
      LOGIN: "Login",
      EMAIL: "Email",
      PASSWORD: "Password",
      ENTER: "Enter",
      MESSAGES: {
        WRONG_DATA: "Wrong data",
      },
    },

    PRODUCT_SEARCH_FORM: {
      SEARCH_VALUE: "search by...",
    },

    PRODUCT: {
      ADD_PRODUCT: "Add product",
      EDIT_PRODUCT: "edit product",
      TITLE: "title",
      DESCRIPTION: "Description",
      PRICE: "Price",
      DISCOUNT_PERCENTAGE: "Discount in %",
      DISCOUNT_PRICE: "Discount",
      AMOUNT: "Amount",
      BRAND: "Brand",
      CATEGORY: "Category",
      IMAGES: "Images",
      MAIN_IMAGE: "main image",
      IS_NOT_MAIN_IMAGE: "is not main image",
      MESSAGES: {
        SELECT_CATEGORY: "Select category",
        SELECT_BRAND: "Select brand",
        ADDED_NOT_SUCCESSFULLY: "Product not added successfully",
        ADDED_SUCCESSFULLY: "Product added successfully",
      },
    },

    SETTINGS: {
      KEY: "Key",
      VALUE: "Value",
      ADD_SETTING: "Add setting",
      EDIT_SETTING: "Edit setting",
      MESSAGES: {
        SETTINGS_NOT_FETCHED: "setting not fetched",
        ADDED_NOT_SUCCESSFULLY: "setting mot added successfully",
        UPDATED_NOT_SUCCESSFULLY: "setting not updated successfully",
      },
    },

    SEARCH_USER: {
      NAME_EMAIL_OR_PHONE: "Name, email or phone",
      ROLE: "Role",
      SEARCH: "Search",
      MESSAGES: {
        SELECT_ROLE: "Select role",
      },
    },

    USER: {
      FIRST_NAME: "First name",
      LAST_NAME: "Last name",
      EMAIL: "Email",
      PHONE: "Phone",
      ROLE: "Role",
      ADD_USER: "Add user",
      EDIT_USER: "Edit user",
      PASSWORD: "password",
      REPEAT_PASSWORD: "Repeat password",
      CHANGE_USER_PASSWORD: "Change password",
      LOGIN_USER_PASSWORD: "Login user password",
      MESSAGES: {
        SELECT_ROLE: "Select role",
        ADDED_SUCCESSFULLY: "User added successfully",
        ADDED_NOT_SUCCESSFULLY: "User not added successfully",
        USER_DELETED: "User deleted",
        USER_NOT_DELETED: "User not deleted",
        USERS_NOT_FETCHED: "User not fetched",
        MISSING_ORDERS: "Missing orders",
        USER_PASSWORD_CHANGED: "User password changed",
        USER_PASSWORD_NOT_CHANGED: "User password not changed",
      },
    },

    TRANSLATION: {
      KEY: "Key",
      LABEL: "Label",
      LANG: "Language",
      ADD_TRANSLATION: "Add translation",
      EDIT_TRANSLATION: "Edit translation",
      MESSAGES: {
        SELECT_LANG: "Select language",
        TRANSLATIONS_NOT_FETCHED: "Translations not fetched",
        ADDED_SUCCESSFULLY: "Translation added successfully",
        ADDED_NOT_SUCCESSFULLY: "Translation not added successfully",
        UPDATED_SUCCESSFULLY: "Translation updated successfully",
        UPDATED_NOT_SUCCESSFULLY: "Translation not updated successfully",
        TRANSLATION_DELETED: "Translation deleted",
        TRANSLATION_NOT_DELETED: "Translation not deleted",
      },
    },

    SOCIAL: {
      TYPE: "Type",
      LABEL: "Label",
      LINK: "Link",
      ADD_SOCIAL: "Add social contact",
      EDIT_SOCIAL: "edit social contact",
      MESSAGES: {
        SELECT_SOCIAL: "Select social contact",
        SOCIALS_NOT_FETCHED: "Social contact not fetched",
        ADDED_SUCCESSFULLY: "social contact added successfully",
        ADDED_NOT_SUCCESSFULLY: "social contact not added successfully",
        UPDATED_SUCCESSFULLY: "social contact updated successfully",
        UPDATED_NOT_SUCCESSFULLY: "social contact not updated successfully",
        SOCIAL_DELETED: "Social contact deleted",
        SOCIAL_NOT_DELETED: "Social contact not deleted",
      },
    },
  },

  MODELS: {
    PRODUCT: {
      TITLE: "Title",
      DESCRIPTION: "Description",
      PRICE: "Price",
      DISCOUNT_PERCENTAGE: "Discount in %",
      DISCOUNT_PRICE: "Discount",
      VIEWS: "Views",
      RATING: "Rating",
      AMOUNT: "Amount",
      BRAND: "Brand",
      CATEGORY: "Category",
      IMAGES: "Images",
      PUBLISH: "Publish",
      IS_PUBLISH: "Is publish",
      UNPUBLISH: "Unpublish",
      PUBLISHED: "Публикуван",
      NOT_PUBLISHED: "Not publish",
      IN_ORDERS: "In order",
    },

    SETTINGS: {
      KEY: "Key",
      VALUE: "Value",
    },

    USER: {
      FIRST_NAME: "First name",
      LAST_NAME: "Last name",
      EMAIL: "Email",
      PHONE: "Phone",
      ROLE: "Role",
      ORDERS: "Orders",
    },

    TRANSLATION: {
      KEY: "Key",
      LABEL: "Label",
      LANG: "Language",
    },

    SOCIAL: {
      TYPE: "Type",
      LABEL: "Label",
      LINK: "Link",
    },

    ORDER: {
      STATUS: "Status",
      ADDRESS: "Location",
      DESCRIPTION: "Description",
      PRODUCTS: "Products",
      FINISH: "Finish",
      EMAIL: "email",
      PHONE: "Phone",
      USER: "User",
    },
  },

  COMMON: {
    LOGIN: "Login",
    LOGOUT: "Logout",
    ADD: "Add",
    DELETE: "Delete",
    ORDER: "Order",
    SEARCH: "Търсене",
    INQUIRY: "Inquiry",
    SIGN_IN: "Sign in",
    SIGN_UP: "Sign up",
    PRODUCTS: "Products",
    HELP: "Help",
    PREVIEW: "Preview",
    CONVERT_IMAGES: "Convert images",
    SELECT_CATEGORY: "Select category",
    SELECT_ROLE: "Select role",
    SELECT_ORDER_STATUS: "Select order status",
    ALL: "all",
    EDIT: "edit",
    TOTAL: "Total",
    LIST: "List",
  },

  ENUMS: {
    PRODUCT_CATEGORY_TYPES: {
      UNKNOWN: "Unknown",
      PHONES: "Phones",
      SMARTPHONES: "Phones",
      LAPTOPS: "Laptops",
      TABLETS: "Tablets",
      WATCHES: "Watches",
      HEADPHONES: "Headphones",
      SECOND_HAND: "Second hand",
      ACCESSORIES: "Accessories",
    },

    PRODUCT_BRAND_TYPES: {
      UNKNOWN: "Unknown",
      APPLE: "APPLE",
      SAMSUNG: "SAMSUNG",
      XIAOMI: "XIAOMI",
      HUAWEI: "HUAWEI",
      OTHERS: "Others",
    },

    PRODUCT_CURRENCY_CODE_TYPES: { UNKNOWN: "Unknown", BGN: "BGN" },

    ORDER_STATUS_TYPES: {
      UNKNOWN: "Unknown",
      REGISTERED: "Registered",
      COMPLETED: "Completed",
      REFUSED: "Refused",
    },

    ROLE_TYPES: {
      UNKNOWN: "Unknown",
      ADMIN: "Admin",
      CLIENT: "Client",
      TECHNICIAN: "Technician",
      CREATOR: "Creator",
    },

    SOCIAL_TYPES: {
      UNKNOWN: "Unknown",
      FACEBOOK: "FACEBOOK",
      INSTAGRAM: "INSTAGRAM",
      TWEETER: "TWEETER",
      OLX: "OLX",
      BAZAR: "BAZAR",
      VIBER: "VIBER",
      PHONE: "PHONE",
      EMAIL: "EMAIL",
      OTHERS: "Others",
    },

    LANGUAGES_TYPES: {
      UNKNOWN: "Unknown",
      EN: "EN",
      BG: "BG",
    },

    WEEK_DAYS: {
      MONDAY: "Monday",
      TUESDAY: "Tuesday",
      WEDNESDAY: "Wednesday",
      THURSDAY: "Thursday",
      FRIDAY: "Friday",
      SATURDAY: "Saturday",
      SUNDAY: "Sunday",
    },
  },

  MESSAGES: {
    MISSING_DATA: "Missing data",
    PRODUCT_NOT_FETCHED: "Missing data for product",
  },

  CURRENCY: { LV: "BGN" },
};
