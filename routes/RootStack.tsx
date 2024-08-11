import { createStackNavigator } from "@react-navigation/stack";

// types
import RootStackParamList from "../types/RootStackParamListTypes";
import ShoppingCardDrawerStackParamList from "../types/ShoppingCardDrawerStackParamListTypes";

// components
import RootStackRightButtons from "./RootStackRightButtons";

// screen
import HomeScreen from "../app/page";
import ProductDetailsScreen from "../app/products/details/page";
import LeftDrawerScreen from "../components/drawers/LeftDrawer/LeftDrawer";
import RootStackHeaderTitle from "./RootStackHeaderTitle";
import ShoppingCardScreen from "../app/shoppingCard/page";
import FinishOrderScreen from "../app/orders/finishOrder/page";
import LoginScreen from "../app/auth/login/page";

const Stack = createStackNavigator<
  RootStackParamList & ShoppingCardDrawerStackParamList
>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => (
            <RootStackHeaderTitle title="" withSearchBar={true} />
          ),
          headerRight: () => <RootStackRightButtons />,
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: (props) => <RootStackHeaderTitle title="" />,
          headerRight: () => (
            <RootStackRightButtons
              withShoppingCartButton={false}
              withSignInButton={false}
            />
          ),
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        initialParams={{ id: "" }}
        options={{
          headerTitle: (props) => <RootStackHeaderTitle title="" />,
          headerRight: () => <RootStackRightButtons />,
        }}
      />

      <Stack.Screen
        name="FinishOrder"
        component={FinishOrderScreen}
        options={{
          headerTitle: (props) => <RootStackHeaderTitle title="" />,
          headerRight: () => <RootStackRightButtons />,
        }}
      />

      <Stack.Screen
        name="HomeShoppingCard"
        component={ShoppingCardScreen}
        options={{
          headerTitle: (props) => <RootStackHeaderTitle title="" />,
          headerRight: () => <RootStackRightButtons />,
        }}
      />

      <Stack.Screen
        name="Auth"
        component={LeftDrawerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
