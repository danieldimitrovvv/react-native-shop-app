import { StyleSheet } from "react-native";

const mainStyle = {
  containerRow: {
    flex: 1,
    flexDirection: "row",
  },
  containerColumn: {
    flex: 1,
    flexDirection: "column",
  },
  containerCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
} as any;

export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerRow: {
    ...mainStyle.containerRow,
  },
  containerColumn: {
    ...mainStyle.containerColumn,
  },
  containerCenter: {
    ...mainStyle.containerCenter,
  },

  containerRowCenter: {
    ...mainStyle.containerRow,
    ...mainStyle.containerCenter,
  },

  containerColumnCenter: {
    ...mainStyle.containerColumn,
    ...mainStyle.containerCenter,
  },
});
