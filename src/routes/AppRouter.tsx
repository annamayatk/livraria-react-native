import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeProdutos from "../screens/HomeProdutos";
import ListaDesejos from "../screens/ListaDesejos";
import Avaliacoes from "../screens/Avaliacoes";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: "#6200ee",
  }}
>
  <Tab.Screen
    name="Produtos"
    component={HomeProdutos}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Feather name="book-open" color={color} size={size} />
      ),
    }}
  />
</Tab.Navigator>
    </NavigationContainer>
  );
}
