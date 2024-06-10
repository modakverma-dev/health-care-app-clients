import React, { createRef, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Text, TextInput } from "react-native";

import SplashScreen from "./src/Screens/SplashScreen";
import MainStack from "./src/Navigation/MainStack";
import configureStore from "./src/Redux/store";

export const { store, persistor } = configureStore();
export const navigationRef = createRef();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.maxFontSizeMultiplier = 1;
  TextInput.defaultProps = Text.defaultProps || {};
  TextInput.defaultProps.maxFontSizeMultiplier = 1;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          {showSplash ? <SplashScreen /> : <MainStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
