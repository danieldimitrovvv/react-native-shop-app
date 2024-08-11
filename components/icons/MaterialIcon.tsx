import React from "react";
import type { ComponentProps } from "react";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

MIcon.loadFont();

type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

type TypeProps = Omit<ComponentProps<typeof MIcon>, "size">;

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

export const MaterialIcon = ({ size, name, color, ...rest }: IconProps) => (
  <MIcon name={name} size={IconSizes[size]} color={color} {...rest} />
);
