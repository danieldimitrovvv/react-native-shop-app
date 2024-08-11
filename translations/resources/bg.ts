export default {
  NAV: {
    HOME: "Начало",
    PROFILE: "Профил",
    LOGOUT: "Изход",

    PRODUCTS: "Продукти",
    ADD_PRODUCT: "Добави Продукт",
    PRODUCTS_LIST: "Списък с продукти",
    CHANGE_USER_PASSWORD: "Смяна на парола",

    USERS: "Потребители",
    ADD_USER: "Добави потребител",
    USERS_LIST: "Списък с потребители",

    ORDERS: "Поръчки",
    ORDERS_LIST: "Списък с поръчки",

    SETTINGS: "Настройки",
    ADD_SETTING: "Добави Настройка",
    SETTINGS_CLIENT_SETTINGS_LIST: "Списък с клиентски настройки",
    SETTINGS_LIST: "Списък с настройки",

    SOCIALS: "Социални контакти",
    ADD_SOCIAL: "Добави социален контакт",
    SOCIALS_LIST: "Списък със социални контакти",

    TRANSLATIONS: "Преводи",
    ADD_TRANSLATION: "Добави превод",
    TRANSLATIONS_LIST: "Списък с преводи",
  },

  FORMS: {
    GUEST_ORDER: {
      ORDER: "Поръчка",
      FIRST_NAME: "Име",
      LAST_NAME: "Фамилия",
      PHONE: "Телефон",
      EMAIL: "Имейл",
      ADDRESS: "град, улица, блок ",
      DESCRIPTION: "онисани",
      SEND_ORDER: "Направи поръчка",
      SEND_INQUIRY: "Направи запитване",
      MESSAGES: {
        ORDER_WAS_SENT_SUCCESSFULLY: "Поръчката беше успешна",
        ORDER_WAS_NOT_SENT_SUCCESSFULLY: "Поръчката не беше успешна",
        INQUIRY_WAS_SENT_SUCCESSFULLY: "Запитването беше успешна",
        INQUIRY_WAS_NOT_SENT_SUCCESSFULLY: "Запитването не беше успешна",
      },
    },

    LOGIN: {
      LOGIN: "Вход в системата",
      EMAIL: "Имейл",
      PASSWORD: "Парола",
      ENTER: "Вход",
      MESSAGES: {
        WRONG_DATA: "Грешни данни",
      },
    },

    PRODUCT_SEARCH_FORM: {
      SEARCH_VALUE: "Търси по...",
    },

    PRODUCT: {
      ADD_PRODUCT: "Довави продукт",
      EDIT_PRODUCT: "Редактирай продукт",
      TITLE: "Заглавие",
      DESCRIPTION: "Описание",
      PRICE: "Цена",
      DISCOUNT_PERCENTAGE: "Отстъпка в %",
      DISCOUNT_PRICE: "Отстъпка",
      AMOUNT: "Количество",
      BRAND: "Бранд",
      CATEGORY: "Категория",
      IMAGES: "Изображения",
      MAIN_IMAGE: "главно изображение",
      IS_NOT_MAIN_IMAGE: "изображение",
      MESSAGES: {
        SELECT_CATEGORY: "Избери категория",
        SELECT_BRAND: "Избери бранд",
        ADDED_NOT_SUCCESSFULLY: "Продуктът не е добавен успешно",
        ADDED_SUCCESSFULLY: "Продуктът е добавен успешно",
      },
    },

    SETTINGS: {
      KEY: "Ключ",
      VALUE: "Стойност",
      ADD_SETTING: "Добави настройка",
      EDIT_SETTING: "Редактиране на настройка",
      MESSAGES: {
        SETTINGS_NOT_FETCHED: "Неуспещно извлизчане на настройките",
        ADDED_NOT_SUCCESSFULLY: "Неуспешно добавяне на накстройката",
        UPDATED_NOT_SUCCESSFULLY: "Неуспешно обновяване на накстройката",
      },
    },

    SEARCH_USER: {
      NAME_EMAIL_OR_PHONE: "Име, имейл или телефон",
      ROLE: "Категория",
      SEARCH: "Търси",
      MESSAGES: {
        SELECT_ROLE: "Избери роля",
      },
    },

    USER: {
      FIRST_NAME: "Име",
      LAST_NAME: "Фамилия",
      EMAIL: "Имейл",
      PHONE: "Телефон",
      ROLE: "Роля",
      ADD_USER: "Добави Потребител",
      EDIT_USER: "Редактирай Потребител",
      PASSWORD: "парола",
      REPEAT_PASSWORD: "Повтори паролата",
      CHANGE_USER_PASSWORD: "Смяна на парола",
      LOGIN_USER_PASSWORD: "Парола на логнат потребител",
      MESSAGES: {
        SELECT_ROLE: "Избери роля",
        ADDED_SUCCESSFULLY: "Успешно добавяне на потребителя",
        ADDED_NOT_SUCCESSFULLY: "Неуспешно добавяне на потребителя",
        USER_DELETED: "Потребителят е изтрит",
        USER_NOT_DELETED: "Потребителят не е изтрит",
        USERS_NOT_FETCHED: "Неуспешно извличане на потребителите",
        MISSING_ORDERS: "Няма направени поръчки",
        USER_PASSWORD_CHANGED: "успешна смяна на парола",
        USER_PASSWORD_NOT_CHANGED: "Неуспешна смяна на парола",
      },
    },

    TRANSLATION: {
      KEY: "Ключ",
      LABEL: "Етикет",
      LANG: "Език",
      ADD_TRANSLATION: "Добави превод",
      EDIT_TRANSLATION: "Редактирай превод",
      MESSAGES: {
        SELECT_LANG: "Избери език",
        TRANSLATIONS_NOT_FETCHED: "Неуспещно извлизчане на преводите",
        ADDED_SUCCESSFULLY: "Успешно добавяне на превода",
        ADDED_NOT_SUCCESSFULLY: "Неуспешно добавяне на превода",
        UPDATED_SUCCESSFULLY: "Успешно обновяване на превода",
        UPDATED_NOT_SUCCESSFULLY: "Неуспешно обновяване на превода",
        TRANSLATION_DELETED: "Превода е изтрит",
        TRANSLATION_NOT_DELETED: "Превода не е изтрит",
      },
    },

    SOCIAL: {
      TYPE: "Тип",
      LABEL: "Етикет",
      LINK: "Линк",
      ADD_SOCIAL: "Добави социален контакт",
      EDIT_SOCIAL: "Редактирай социален контакт",
      MESSAGES: {
        SELECT_SOCIAL: "Избери социален контакт",
        SOCIALS_NOT_FETCHED: "Неуспещно извлизчане на социалните контакти",
        ADDED_NOT_SUCCESSFULLY: "Неуспешно добавяне на социалния контакт",
        UPDATED_NOT_SUCCESSFULLY: "Неуспешно обновяване на социалния контакт",
        SOCIAL_DELETED: "Социалния контакт е изтрит",
        SOCIAL_NOT_DELETED: "Социалния контакт не е изтрит",
      },
    },
  },

  MODELS: {
    PRODUCT: {
      TITLE: "Заглавие",
      DESCRIPTION: "Описание",
      PRICE: "Цена",
      DISCOUNT_PERCENTAGE: "Отстъпка в %",
      DISCOUNT_PRICE: "Отстъпка",
      VIEWS: "Прегледано",
      RATING: "Оценка",
      AMOUNT: "Количество",
      BRAND: "Бранд",
      CATEGORY: "Категория",
      IMAGES: "Изображения",
      PUBLISH: "Публикувай",
      IS_PUBLISH: "Публикуван",
      UNPUBLISH: "Отмяна на публикуването",
      PUBLISHED: "Публикуван",
      NOT_PUBLISHED: "Не публикуван",
      IN_ORDERS: "В поръчка",
    },

    SETTINGS: {
      KEY: "Ключ",
      VALUE: "Стойност",
    },

    USER: {
      FIRST_NAME: "Име",
      LAST_NAME: "Фамилия",
      EMAIL: "Имейл",
      PHONE: "Телефон",
      ROLE: "Роля",
      ORDERS: "Поръчки",
    },

    TRANSLATION: {
      KEY: "Ключ",
      LABEL: "Етикет",
      LANG: "Език",
    },

    SOCIAL: {
      TYPE: "Тип",
      LABEL: "Етикет",
      LINK: "Линк",
    },

    ORDER: {
      STATUS: "Статус",
      ADDRESS: "Местоположение",
      DESCRIPTION: "Описание",
      PRODUCTS: "Продуцти",
      FINISH: "Завърши",
      CANCEL: "Откажи",
      EMAIL: "Имейл",
      PHONE: "Телефон",
      USER: "Потребител",
    },
  },

  COMMON: {
    LOGIN: "Вход в системата",
    LOGOUT: "Изход",
    ADD: "Добави",
    DELETE: "Изтрий",
    ORDER: "Поръчка",
    SEARCH: "Търсене",
    INQUIRY: "Запитване",
    SIGN_IN: "Вход",
    SIGN_UP: "Регистрация",
    PRODUCTS: "Продукти",
    HELP: "Помощ",
    PREVIEW: "Преглед",
    CONVERT_IMAGES: "конвентиране на изображенията",
    SELECT_CATEGORY: "Избери категория",
    SELECT_ROLE: "Избери роля",
    SELECT_ORDER_STATUS: "Избери статус на повъчката",
    ALL: "всички",
    EDIT: "редактиране",
    TOTAL: "Общо",
    LIST: "Списък",
  },

  ENUMS: {
    PRODUCT_CATEGORY_TYPES: {
      UNKNOWN: "Неразпознат",
      PHONES: "Телефони",
      SMARTPHONES: "Телефони",
      LAPTOPS: "Лаптопи",
      TABLETS: "Таблети",
      WATCHES: "Часовници",
      HEADPHONES: "Слушалки",
      SECOND_HAND: "Втора употреба",
      ACCESSORIES: "Аксесоари",
    },

    PRODUCT_BRAND_TYPES: {
      UNKNOWN: "Неразпознат",
      APPLE: "APPLE",
      SAMSUNG: "SAMSUNG",
      XIAOMI: "XIAOMI",
      HUAWEI: "HUAWEI",
      OTHERS: "ДРУГИ",
    },

    PRODUCT_CURRENCY_CODE_TYPES: { UNKNOWN: "Неразпознат", BGN: "лв" },

    ORDER_STATUS_TYPES: {
      UNKNOWN: "Неразпознат",
      REGISTERED: "Регистрирана",
      COMPLETED: "Завършена",
      REFUSED: "Отказана",
    },

    ROLE_TYPES: {
      UNKNOWN: "Неразпознат",
      ADMIN: "Админ",
      CLIENT: "Клиент",
      TECHNICIAN: "Техник",
      CREATOR: "Редактор",
    },

    SOCIAL_TYPES: {
      UNKNOWN: "Неразпознат",
      FACEBOOK: "FACEBOOK",
      INSTAGRAM: "INSTAGRAM",
      TWEETER: "TWEETER",
      OLX: "OLX",
      BAZAR: "BAZAR",
      VIBER: "VIBER",
      PHONE: "PHONE",
      EMAIL: "EMAIL",
      OTHERS: "Друг",
    },

    LANGUAGES_TYPES: {
      UNKNOWN: "Неразпознат",
      EN: "EN",
      BG: "BG",
    },

    WEEK_DAYS: {
      MONDAY: "Понеделник",
      TUESDAY: "Вторник",
      WEDNESDAY: "Сряда",
      THURSDAY: "Четвъртък",
      FRIDAY: "Петък",
      SATURDAY: "Събота",
      SUNDAY: "Неделя",
    },
  },

  MESSAGES: {
    MISSING_DATA: "Липсват данни",
    PRODUCT_NOT_FETCHED: "Липсват данни за продуцта",
  },

  CURRENCY: { LV: "лв." },
};
