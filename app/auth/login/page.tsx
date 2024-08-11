import React from "react";
import { SafeAreaView, Text } from "react-native";
import LoginForm from "./components/LoginForm";

// images
const logo = require("../../../assets/app-icon.png");

export default function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm />
    </SafeAreaView>
  );
}
