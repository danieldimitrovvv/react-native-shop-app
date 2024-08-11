export type ColorSchema = { value: string; contrastText: string };

export type PaletteColorSchema = {
  light: ColorSchema;
  main: ColorSchema;
  dark: ColorSchema;
};

export const black = "#000";

export const white = "#fff";

export const primaryColor: PaletteColorSchema = {
  light: { value: "#4dabf5", contrastText: black },
  main: { value: "#2196f3", contrastText: white },
  dark: { value: "#1769aa", contrastText: white },
};

export const secondaryColor: PaletteColorSchema = {
  light: { value: "#834bff", contrastText: white },
  main: { value: "#651fff", contrastText: white },
  dark: { value: "#4615b2", contrastText: white },
};

export const errorColor: PaletteColorSchema = {
  light: { value: "#f6685e", contrastText: black },
  main: { value: "#f44336", contrastText: black },
  dark: { value: "#aa2e25", contrastText: white },
};

export const successColor: PaletteColorSchema = {
  light: { value: "#91ff35", contrastText: black },
  main: { value: "#76ff03", contrastText: black },
  dark: { value: "#52b202", contrastText: black },
};

export const infoColor: PaletteColorSchema = {
  light: { value: "#33eaff", contrastText: black },
  main: { value: "#00e5ff", contrastText: black },
  dark: { value: "#00a0b2", contrastText: black },
};

export const warningColor: PaletteColorSchema = {
  light: { value: "#ffee33", contrastText: black },
  main: { value: "#ffea00", contrastText: black },
  dark: { value: "#b2a300", contrastText: black },
};

export const greyColor: PaletteColorSchema = {
  light: { value: "#e0e0e0", contrastText: black },
  main: { value: "#757575", contrastText: white },
  dark: { value: "#424242", contrastText: white },
};

export const palette = {
  primary: primaryColor,
  secondary: secondaryColor,
  error: errorColor,
  success: successColor,
  info: infoColor,
  warning: warningColor,
  grey: greyColor,
};

export default palette;
