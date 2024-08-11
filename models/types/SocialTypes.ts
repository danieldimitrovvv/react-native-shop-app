// import { Instagram, Mail, Phone } from "@mui/icons-material";
// import { BazarSvgIcon } from "../../components/CustomSvgIcons/BazarSvgIcon";
// import { FacebookSvgIcon } from "../../components/CustomSvgIcons/FacebookSvgIcon";
// import { OLXSvgIcon } from "../../components/CustomSvgIcons/OLXSvgIcon";
// import { ViberSvgIcon } from "../../components/CustomSvgIcons/ViberSvgIcon";
// import ChatIcon from "@mui/icons-material/Chat";

enum SocialTypes {
  UNKNOWN = "UNKNOWN",

  FACEBOOK = "FACEBOOK",
  INSTAGRAM = "INSTAGRAM",

  OLX = "OLX",
  BAZAR = "BAZAR",

  VIBER = "VIBER",
  PHONE = "PHONE",
  EMAIL = "EMAIL",
  OTHERS = "OTHERS",
}

export const getSocialTypesIcon = (
  type: SocialTypes,
  iconStyles?: object
): any => {
  switch (type) {
    case SocialTypes.FACEBOOK:
      return {
        icon: { name: "facebook-f", type: "font-awesome" },
        containerProps: { bgcolor: "#039be5", color: "#FFF" },
        iconContainerProps: { bgcolor: "#039be5" },
      };

    case SocialTypes.INSTAGRAM:
      return {
        icon: { name: "instagram", type: "font-awesome" },
        containerProps: { color: "#fff", bgcolor: "#d82d7e" },
        iconContainerProps: { bgcolor: "#d82d7e" },
      };

    case SocialTypes.OLX:
      return {
        icon: { name: "shop", type: "entypo" },
        containerProps: { color: "#fff", bgcolor: "#002F34" },
        iconContainerProps: { bgcolor: "#002F34" },
      };

    case SocialTypes.BAZAR:
      return {
        icon: { name: "shop", type: "entypo" },
        containerProps: { bgcolor: "#3C6FB6", color: "#FFF" },
        iconContainerProps: { bgcolor: "#FF7700" },
      };

    case SocialTypes.VIBER:
      return {
        icon: { name: "viber", type: "fontisto" },
        containerProps: { bgcolor: "#7360f2", color: "#FFF" },
        iconContainerProps: { bgcolor: "#7360f2" },
      };

    case SocialTypes.PHONE:
      return {
        icon: { name: "phone", type: "font-awesome" },
        containerProps: { color: "#fff", bgcolor: "#66bb6a" },
        iconContainerProps: { bgcolor: "#66bb6a" },
      };

    case SocialTypes.EMAIL:
      return {
        icon: { name: "email", type: "fontisto" },
        containerProps: { color: "#fff", bgcolor: "#f44336" },
        iconContainerProps: { bgcolor: "#f44336" },
      };

    case SocialTypes.OTHERS:
    default:
      return {
        icon: { name: "hipchat", type: "fontisto" },
        containerProps: { bgcolor: "#000", color: "#FFF" },
        iconContainerProps: { bgcolor: "#000" },
      };
  }
};

export default SocialTypes;
