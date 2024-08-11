import { View } from "react-native";
import LanguageMenu from "../components/header/LanguageMenu";
import ShoppingCardButton from "../components/buttons/ShoppingCardButton/ShoppingCardButton";
import { useTranslation } from "react-i18next";
import { Button } from "@rneui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import RootStackParamList from "../types/RootStackParamListTypes";

type RootStackRightButtonsProps = {
  withSignInButton?: boolean;
  withLanguagesButton?: boolean;
  withShoppingCartButton?: boolean;
};

export default function RootStackRightButtons({
  withSignInButton = true,
  withLanguagesButton = true,
  withShoppingCartButton = true,
}: RootStackRightButtonsProps) {
  const { t } = useTranslation();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function onPressSignInHandel() {
    navigation.navigate("Login");
  }

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: 2,
      }}
    >
      {withSignInButton && (
        <View>
          <Button
            title={t("COMMON.SIGN_IN")}
            type="outline"
            size="sm"
            radius="lg"
            containerStyle={{
              width: 70,
              padding: 0,
              margin: 0,
              marginRight: 2,
            }}
            onPress={onPressSignInHandel}
          />
        </View>
      )}

      {withLanguagesButton && (
        <View>
          <LanguageMenu />
        </View>
      )}

      {withShoppingCartButton && <ShoppingCardButton />}
    </View>
  );
}
