import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as resources from "./resources";

const bgFlag = require("../assets/images/flags/bg-flag.png");
const enFlag = require("../assets/images/flags/en-flag.png");

export const languageOptions = [
  { lang: "bg", icon: bgFlag },
  { lang: "en", icon: enFlag },
];

const resourcesData = {
  ...(Object.keys(resources.default).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        translation: resources.default[key as keyof typeof resources.default],
      },
    }),
    {}
  ) as any),
};

i18n.use(initReactI18next).init({
  lng: "en",
  compatibilityJSON: "v3",
  resources: resourcesData,
});

export default i18n;
