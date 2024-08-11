import React from "react";

import SimpleMessage from "./SimpleMessage";
import { TextProps } from "react-native";

type Props = {
  message: string;
  messageProps?: TextProps;
};

export default function ErrorMessage({ message, messageProps }: Props) {
  return (
    <SimpleMessage message={message} type="error" messageProps={messageProps} />
  );
}
