import React from "react";

// components
import { SafeAreaView } from "react-native";
import OrderForm from "./components/OrderForm";

export default function FinishOrderScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrderForm />
    </SafeAreaView>
  );
}
