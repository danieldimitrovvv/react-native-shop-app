import { StyleProp, TextStyle } from "react-native";
import { black, white } from "../../../../../styles/colors";

export const cellsStyle = {
  key: { width: "50%" },
  value: { width: "30%" },
  actions: { width: "20%" },
} as { [key: string]: StyleProp<any> };

export const textStyleBase = { color: black };
export const headTextStyleBase = { color: white };

export const textStyle = {
  key: { ...textStyleBase },
  value: { ...textStyleBase, textAlign: "right" },
  actions: { ...textStyleBase, textAlign: "right" },
} as { [key: string]: StyleProp<TextStyle> };

export const settingTableHeaderTitle = ["key", "value", ""];
