import { StyleProp, TextStyle } from "react-native";
import { black, white } from "../../../../../styles/colors";

export const cellsStyle = {
  icon: { width: 40 },
  user: { width: 160 },
  email: { width: 120 },
  phone: { width: 100 },
  status: { width: 150 },
  actions: { width: 40 },
} as { [key: string]: StyleProp<any> };

export const textStyleBase = { color: black };
export const headTextStyleBase = { color: white };

export const textStyle = {
  icon: { ...textStyleBase },
  user: { ...textStyleBase },
  email: { ...textStyleBase },
  phone: { ...textStyleBase },
  status: { ...textStyleBase },
  actions: { ...textStyleBase, textAlign: "right" },
} as { [key: string]: StyleProp<TextStyle> };

export const orderTableHeaderTitle = [
  "",
  "user",
  "email",
  "phone",
  "status",
  "",
];
