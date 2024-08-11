import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { black, white } from "../../../../../styles/colors";
import { CellProps } from "react-native-table-component";

export const cellsStyle = {
  image: { width: 160 },
  title: { width: 120 },
  brand: { width: 100 },
  category: { width: 100 },
  amount: { width: 100 },
  price: { width: 100 },
  is_publish: {
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
  image: { ...textStyleBase },
  title: { ...textStyleBase },
  brand: { ...textStyleBase },
  category: { ...textStyleBase },
  amount: { ...textStyleBase, textAlign: "right" },
  price: { ...textStyleBase, textAlign: "right" },
  is_publish: {
    ...textStyleBase,
    textAlign: "center",
  },
  actions: { ...textStyleBase, textAlign: "right" },
} as { [key: string]: StyleProp<TextStyle> };

export const productTableHeaderTitle = [
  "",
  "title",
  "brand",
  "category",
  "amount",
  "price",
  "is_publish",
  "",
];
