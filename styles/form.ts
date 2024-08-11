import { StyleSheet } from "react-native";
import palette, { primaryColor, white } from "./colors";
import { shadowsStyles } from "./shadows";

const dropDownStyle = StyleSheet.create({
  dropdownButtonStyle: {
    width: 150,
    height: 50,
    backgroundColor: primaryColor.light.value,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: primaryColor.main.value,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    paddingTop: 20,
    backgroundColor: white,
    padding: 10,
    ...shadowsStyles.xl,
  },
  image: {
    height: 60,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 20,
    color: palette.primary.main.value,
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: palette.primary.main.value,
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: palette.secondary.main.value,
  },
  button: {
    backgroundColor: palette.primary.main.value,
    height: 45,
    borderColor: palette.grey.main.value,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: palette.primary.main.contrastText,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 10,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: palette.grey.main.value,
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: palette.grey.main.value,
  },
  signup: {
    color: palette.primary.dark.value,
    fontSize: 13,
  },

  ...dropDownStyle,
});
