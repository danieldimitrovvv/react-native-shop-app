import { Image } from "react-native";

// const logo = require("../../assets/app-icon.png");
const logo = require("../../assets/images/shop_logo.png");

function LogoTitle() {
  return (
    <Image
      style={{ width: 120, height: 120 }}
      source={logo}
      resizeMode="contain"
    />
  );
}

export default LogoTitle;
