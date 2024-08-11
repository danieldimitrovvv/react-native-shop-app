import IWorktime from "../../models/Worktime/IWorktime";
import WeekDays from "../../models/types/WeekDays";

const SETTINGS = [
  {
    key: "WITH_PRICE",
    value: "true",
  },
  {
    key: "WITH_PRODUCT_AMOUNT",
    value: "false",
  },
  {
    key: "WITH_CART",
    value: "true",
  },
  {
    key: "WITH_DISCOUNT",
    value: "false",
  },
  {
    key: "GET_LATEST",
    value: "20",
  },
  {
    key: "AUTO_REDIRECT",
    value: "5000",
  },
  {
    key: "PRODUCTS_PER_PAGE",
    value: "50",
  },

  {
    key: "WITH_LOGIN",
    value: "true",
  },

  {
    key: "AFTER_MONTHS",
    value: "1",
  },

  {
    key: "SMTP_HOST",
    value: "smtp.gmail.com",
  },
  {
    key: "SMTP_PORT",
    value: "587",
  },
  {
    key: "EMAIL_SENDER",
    value: "scomruse@gmail.com",
  },
  {
    key: "EMAIL_SENDER_PASSWORD",
    value: "jzsmzgxhehujwtyg",
  },
  {
    key: "REFETCH_SETTINGS_MINUTES",
    value: "180",
  },
  {
    key: "REFETCH_TRANSITIONS_MINUTES",
    value: "60",
  },

  {
    key: "DELETE_PERMANENTLY_ORDERS_AFTER_MINUTES",
    value: "43200",
  },

  {
    key: "DELETE_PERMANENTLY_PRODUCTS_AFTER_MINUTES",
    value: "43200",
  },
];

// users
// mail@smartcom-bg.com

const USERS = [
  {
    firstName: "Kiril",
    lastName: "Ivanov",
    phone: "+359894651870",
    email: "kivanov69@gmail.com",
    password: "creator_2023!",
    role: "CREATOR",
  },

  {
    firstName: "Smartcom",
    lastName: "Ruse",
    phone: "+359886366661",
    email: "mail@smartcom-bg.com",
    password: "Scom2016", //"Tsm1th83!",
    role: "TECHNICIAN",
  },
];

// social
const SOCIALS = [
  {
    label: "facebook.com",
    link: "https://www.facebook.com/SmartcomBG",
    type: "FACEBOOK",
  },
  {
    label: "bazar.bg",
    link: "https://bazar.bg/ads/user/1656792?fbclid=IwAR24nRFgkP7-afRKPiNshs2rZJ3YMxVynpY74wvKgcFnfc-yU-GXHndnoEM",
    type: "BAZAR",
  },
  {
    label: "olx.bg",
    link: "https://smartcom.olx.bg/?fbclid=IwAR0IyEkolCM4WA5aRWmL1IWH5EhxU8lkuV5GsaVdp5yhIuBclnRmUfniI9M",
    type: "OLX",
  },
  {
    label: "+359886366661",
    link: "+359886366661",
    type: "VIBER",
  },
  {
    label: "mail@smartcom-bg.com",
    link: "mail@smartcom-bg.com",
    type: "EMAIL",
  },
];

const TRANSLATIONS = [
  {
    key: "TITLE",
    label: "Заглавие",
    lang: "BG",
  },

  {
    key: "PRICE_PER_PIECE",
    label: "Цена (за бр.)",
    lang: "BG",
  },

  {
    key: "ORDERED_COUNTERS",
    label: "Поръчани бройки",
    lang: "BG",
  },

  {
    key: "TOTAL_SUM",
    label: "Обща сума",
    lang: "BG",
  },
  {
    key: "DUE_SUM",
    label: "Дължима сума",
    lang: "BG",
  },
];

const SMARTCOM_DATA = {
  settings: SETTINGS,
  users: USERS,
  socials: SOCIALS,
  translations: TRANSLATIONS,
};

export function getSmartcomWorktime() {
  const worktime: IWorktime[] = [];
  const workDays = [
    WeekDays.MONDAY,
    WeekDays.TUESDAY,
    WeekDays.WEDNESDAY,
    WeekDays.THURSDAY,
    WeekDays.FRIDAY,
  ];

  workDays.forEach((day) => {
    worktime.push(
      ...[
        {
          day,
          from: new Date(0, 0, 0, 10, 0, 0).toISOString(),
          to: new Date(0, 0, 0, 19, 0, 0).toISOString(),
          isLunchBreak: false,
        } as IWorktime,
        {
          day,
          from: new Date(0, 0, 0, 13, 0, 0).toISOString(),
          to: new Date(0, 0, 0, 14, 0, 0).toISOString(),
          isLunchBreak: true,
        } as IWorktime,
      ]
    );
  });

  worktime.push({
    day: WeekDays.SATURDAY,
    from: new Date(0, 0, 0, 10, 0, 0).toISOString(),
    to: new Date(0, 0, 0, 16, 0, 0).toISOString(),
    isLunchBreak: false,
  } as IWorktime);

  worktime.push({
    day: WeekDays.SUNDAY,
    from: undefined,
    to: undefined,
    isLunchBreak: false,
  } as IWorktime);

  return worktime;
}

export default SMARTCOM_DATA;
