import { StyleSheet } from "react-native";
import { black, greyColor, primaryColor, white } from "./colors";
import { shadowsStyles } from "./shadows";

export const tableStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingVertical: 0,
    backgroundColor: white,
    ...shadowsStyles.lg,
  },
  head: {
    flex: 1,
    width: "100%",
    height: 40,
    backgroundColor: primaryColor.main.value,
    color: primaryColor.main.contrastText,
    paddingHorizontal: 10,
  },
  img: {
    height: 140,
    width: 140,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: white,
    borderRadius: 10,
    backgroundColor: black,
    ...shadowsStyles.lg,
  },
  text: { margin: 6 },
  row: {
    flexDirection: "row",
    backgroundColor: greyColor.dark.value,
    color: white,
    paddingHorizontal: 10,
  },
});
