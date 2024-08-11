import { StyleProp, TextStyle } from "react-native";
import { black, white } from "../../../../../styles/colors";

export const cellsStyle = {
  key: { width: 160 },
  label: { width: 120 },
  language: { width: 100 },
  actions: { width: 40 },
} as { [key: string]: StyleProp<any> };

export const textStyleBase = { color: black };
export const headTextStyleBase = { color: white };

export const textStyle = {
  key: { ...textStyleBase },
  label: { ...textStyleBase },
  language: { ...textStyleBase, textAlign: "right" },
  actions: { ...textStyleBase, textAlign: "right" },
} as { [key: string]: StyleProp<TextStyle> };

export const translationTableHeaderTitle = ["key", "label", "lang", ""];
