import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SafeAreaView,
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { Provider } from "react-native-paper";
import { ThemeProvider } from "react-native-elements";

// store
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store/store";

// types
import RootStackParamList from "./types/RootStackParamListTypes";

// routes
import RootStack from "./routes/RootStack";

//  styles
import { containerStyles } from "./styles/main";

import "./translations/index";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={containerStyles.container}>
        <ThemeProvider>
          <StoreProvider store={store}>
            <Provider>
              <View style={{ flex: 1 }}>
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </View>
            </Provider>
          </StoreProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
