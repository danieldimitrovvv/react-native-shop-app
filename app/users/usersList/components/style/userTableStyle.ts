import { StyleProp, TextStyle } from "react-native";
import { black, white } from "../../../../../styles/colors";

export const cellsStyle = {
  firstName: { width: 120 },
  lastName: { width: 120 },
  email: { width: 120 },
  phone: { width: 120 },
  role: {
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: { width: 40 },
} as { [key: string]: StyleProp<any> };

export const textStyleBase = { color: black };
export const headTextStyleBase = { color: white };

export const textStyle = {
  firstName: { ...textStyleBase },
  lastName: { ...textStyleBase },
  email: { ...textStyleBase },
  phone: { ...textStyleBase },
  role: {
    ...textStyleBase,
    textAlign: "center",
  },
  actions: { ...textStyleBase, textAlign: "right" },
} as { [key: string]: StyleProp<TextStyle> };

export const userTableHeaderTitle = [
  "first_Name",
  "last_Name",
  "email",
  "phone",
  "role",
  "",
];
