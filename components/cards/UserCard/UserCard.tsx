import { useTranslation } from "react-i18next";

// styles
import { errorColor, greyColor, primaryColor } from "../../../styles/colors";
import { shadowsStyles } from "../../../styles/shadows";

// components
import { Text, View, Button } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import IBaseUserModel from "../../../models/db/User/BaseUserModel/IBaseUserModel";
import { formStyles } from "../../../styles/form";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";

type Props = {
  user: IBaseUserModel;
  children?: JSX.Element;
  withChangePasswordButton?: boolean;
};

const UserCard = ({
  user,
  children,
  withChangePasswordButton = false,
}: Props) => {
  const { t } = useTranslation();

  const navigator = useNavigation<NavigationProp<LeftDrawerStackParamList>>();

  function handleOnChangePassword() {
    navigator.navigate("ChangeUserPassword", { id: user.id.toString() });
  }

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

        {withChangePasswordButton && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              width: "80%",
              overflow: "hidden",
              marginTop: 10,
            }}
          >
            <Button
              onPress={handleOnChangePassword}
              title={t("FORMS.USER.CHANGE_USER_PASSWORD").toUpperCase()}
              color={errorColor.main.value}
            />
          </View>
        )}
      </View>

      {children}
    </View>
  );
};

export default UserCard;
