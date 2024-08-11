import React from "react";
import { View, Text, Platform } from "react-native";
import { SearchBar } from "react-native-elements";

import LogoTitle from "../LogoTitle";

type HeaderTitleProps = {
  title: string;
};

export default function HeaderTitle(props: HeaderTitleProps) {
  const [search, setSearch] = React.useState("");

  function updateSearch(text?: string) {
    setSearch(text ?? "");
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* <LogoTitle /> */}
      <Text style={{ fontSize: 30 }}>{props.title?.toUpperCase()}</Text>
    </View>
  );
}
