import { StyleProp, TextStyle } from "react-native";
import { black, white } from "../../../../../styles/colors";

export const cellsStyle = {
  icon: { width: 60 },
  label: { width: 120 },
  link: { width: 160 },
  type: { width: 100 },
  actions: { width: 40 },
} as { [key: string]: StyleProp<any> };

export const textStyleBase = { color: black };
export const headTextStyleBase = { color: white };

export const textStyle = {
  icon: { ...textStyleBase },
  label: { ...textStyleBase },
  link: { ...textStyleBase },
  type: { ...textStyleBase, textAlign: "right" },
  actions: { ...textStyleBase, textAlign: "right" },
} as { [key: string]: StyleProp<TextStyle> };

export const socialTableHeaderTitle = ["", "label", "link", "type", ""];
