import React from "react";
import AppRouter from "./src/routes/AppRouter";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}
