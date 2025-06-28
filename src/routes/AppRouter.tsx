import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeProdutos from "../screens/HomeProdutos";
import { Feather } from "@expo/vector-icons";
import Avaliacoes from "../screens/Avaliacoes";
import ListaDesejos from "../screens/ListaDesejos";

const Tab = createBottomTabNavigator();

export default function AppRouter() {
  return (
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

        <Tab.Screen
          name="Avaliações"
          component={Avaliacoes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="star" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Lista de Desejos"
          component={ListaDesejos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
  );
}
