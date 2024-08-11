import {
  PaletteColorSchema,
  greyColor,
  primaryColor,
} from "../../styles/colors";
import { Icon } from "@rneui/base";

export type CustomRouteType = {
  label: string;
  key: string;
  color?: PaletteColorSchema;
  activeColor?: PaletteColorSchema;
  icon: React.ComponentProps<typeof Icon>;
  children?: CustomRouteType[];
};

export const colorTheme = {
  color: greyColor,
  activeColor: primaryColor,
};

export const RouteIconProps = {
  size: 20,
  color: colorTheme.color.main.value,
  type: "simple-line",
};
