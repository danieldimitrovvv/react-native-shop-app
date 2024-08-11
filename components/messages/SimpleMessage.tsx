import React from "react";

import { Text, StyleSheet, TextProps, TextStyle } from "react-native";
import {
  ColorSchema,
  PaletteColorSchema,
  errorColor,
  greyColor,
  infoColor,
  successColor,
  warningColor,
} from "../../styles/colors";
import { StyleProp } from "react-native";

type MessageType = "default" | "info" | "error" | "success" | "warning";

type MessageVariant = "default" | "outline" | "contain";

type MessageTheme = "main" | "light" | "dark";

export type SimpleMessageProps = {
  message: string;
  messageProps?: TextProps;
  type?: MessageType;
  variant?: MessageVariant;
  theme?: MessageTheme;
};

export default function SimpleMessage({
  message,
  messageProps,
  type = "default",
  variant = "default",
  theme = "main",
}: SimpleMessageProps) {
  function getStyleByType() {
    let color: PaletteColorSchema = greyColor;

    switch (type) {
      case "info":
        color = errorColor;
        break;

      case "error":
        color = errorColor;
        break;

      case "success":
        color = successColor;
        break;

      case "warning":
        color = warningColor;
        break;

      default:
        break;
    }

    return color[theme];
  }

  function getStyle() {
    const { contrastText, value: color } = getStyleByType();
    const borderStyle = {
      borderWidth: 1,
      borderRadius: 10,
    };

    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          color: color,
          borderColor: color,
          ...borderStyle,
        };

      case "contain":
        return {
          backgroundColor: color,
          color: contrastText,
          borderColor: contrastText,
          ...borderStyle,
        };

      default:
        return {
          backgroundColor: "transparent",
          color: color,
        };
    }
  }

  const propStyle = messageProps?.style ? (messageProps.style as any) : {};

  return (
    <Text
      {...messageProps}
      style={{ ...styles.container, ...getStyle(), ...propStyle }}
    >
      {message.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    padding: 20,
    margin: 10,
    textAlign: "center",
    fontWeight: 900,
  },
});
