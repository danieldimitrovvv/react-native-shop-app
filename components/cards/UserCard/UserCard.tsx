import { useTranslation } from "react-i18next";

// styles
import { greyColor, primaryColor } from "../../../styles/colors";
import { shadowsStyles } from "../../../styles/shadows";

// components
import { Text, View } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import IBaseUserModel from "../../../models/db/User/BaseUserModel/IBaseUserModel";

type Props = { user: IBaseUserModel; children?: JSX.Element };

const UserCard = ({ user, children }: Props) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        gap: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "90%",
          marginTop: 10,
          paddingVertical: 10,
          borderWidth: 2,
          borderBottomWidth: 0,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderColor: primaryColor.main.value,
          overflow: "hidden",
          ...shadowsStyles.sm,
        }}
      >
        <Badge
          status="primary"
          containerStyle={{ position: "absolute", top: 25, left: -20 }}
          value={user.role}
          textStyle={{ fontSize: 12 }}
          badgeStyle={{
            height: "auto",
            paddingHorizontal: 30,
            borderRadius: 0,
            transform: "rotate(-45deg)",
            ...shadowsStyles.sm,
          }}
        />
        <Avatar
          rounded
          size="medium"
          overlayContainerStyle={{
            backgroundColor: primaryColor.main.value,
          }}
          titleStyle={{ color: primaryColor.main.contrastText }}
          title={`${user.firstName[0]}${user.lastName[0]}`}
        />
        <Text
          style={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: 20,
            color: primaryColor.main.value,
          }}
        >{`${user.firstName} ${user.lastName}`}</Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: 10,
            color: greyColor.main.value,
          }}
        >{`${user.email} | ${user.phone}`}</Text>
      </View>

      {children}
    </View>
  );
};

export default UserCard;
