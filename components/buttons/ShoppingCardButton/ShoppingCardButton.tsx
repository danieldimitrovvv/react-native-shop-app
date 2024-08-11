import { View } from "react-native";
import { Badge, Icon } from "react-native-elements";

//  stores
import { useShoppingCartState } from "../../../store/slices/shopping-cart/shoppingCartSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ShoppingCardDrawerStackParamList from "../../../types/ShoppingCardDrawerStackParamListTypes";

export default function ShoppingCardButton() {
  const shoppingCardState = useShoppingCartState();

  const navigation =
    useNavigation<NavigationProp<ShoppingCardDrawerStackParamList>>();

  return (
    <View>
      <Icon
        name="add-shopping-cart"
        color="#000"
        size={30}
        type=""
        onPress={() => {
          navigation.navigate("HomeShoppingCard");
        }}
      />
      {shoppingCardState.items.length > 0 && (
        <Badge
          status="success"
          value={shoppingCardState.items.length}
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      )}
    </View>
  );
}
