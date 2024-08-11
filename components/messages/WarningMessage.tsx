import React from "react";

import SimpleMessage from "./SimpleMessage";

type Props = {
  message: string;
};

export default function WarningMessage({ message }: Props) {
  return <SimpleMessage message={message} type="warning" />;
}
