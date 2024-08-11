import React from "react";
import { View } from "react-native";

import LanguageMenu from "./LanguageMenu";
import HeaderTitle from "./HeaderTitle";

type HeaderTitleProps = {
  title: string;
};

export default function AppHeader(props: HeaderTitleProps) {
  return <HeaderTitle {...props} />;
}
