import { red, green, yellow, blue } from "@mui/material/colors";

enum DialogTypes {
  DEFAULT = "default",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

export const getDialogStyle = (type: DialogTypes) => {
  switch (type) {
    case DialogTypes.ERROR:
      return { style: { color: red[300] } };

    case DialogTypes.SUCCESS:
      return { style: { color: green[300] } };

    case DialogTypes.WARNING:
      return { style: { color: yellow[300] } };

    case DialogTypes.INFO:
      return { style: { color: blue[300] } };

    default:
      return {};
  }
};

export default DialogTypes;
