import React from "react";
import type { ComponentProps } from "react";
import SLineIcon from "react-native-vector-icons/SimpleLineIcons";

SLineIcon.loadFont();

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

type TypeProps = Omit<ComponentProps<typeof SLineIcon>, "size">;

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

export const SimpleLineIcon = ({ size, name, color, ...rest }: IconProps) => (
  <SLineIcon name={name} size={IconSizes[size]} color={color} {...rest} />
);
