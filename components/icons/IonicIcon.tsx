import React from "react";
import type { ComponentProps } from "react";
import Icon from "react-native-vector-icons/Ionicons";

Icon.loadFont();

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

type TypeProps = Omit<ComponentProps<typeof Icon>, "size">;

export type IconProps = TypeProps & {
  size: IconSizeProps["iconSizes"];
  name: string;
  color: string;
};

export const IconSizes = {
  small: 13,
  medium: 18,
  large: 23,
  extraLarge: 27,
};

export const IonicIcon = ({ size, name, color, ...rest }: IconProps) => (
  <Icon name={name} size={IconSizes[size]} color={color} {...rest} />
);
