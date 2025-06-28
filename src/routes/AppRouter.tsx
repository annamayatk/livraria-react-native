import React, { JSX } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeProdutos from "../screens/HomeProdutos";
import { Feather } from "@expo/vector-icons";
import Avaliacoes from "../screens/Avaliacoes";
import ListaDesejos from "../screens/ListaDesejos";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, View } from "react-native";

const Tab = createBottomTabNavigator();

interface AppRouterProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export default function AppRouter({ isLoggedIn, setIsLoggedIn }: AppRouterProps): JSX.Element {
  if (!isLoggedIn) {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Login"
          options={{ tabBarButton: () => null }}
        >
          {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
  return (
      <Tab.Navigator
        initialRouteName="Produtos"
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

        <Tab.Screen
          name="Sair"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="log-out" color={color} size={size} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              // Previne a navegação
              e.preventDefault();
              
              // Executa o logout diretamente
              Alert.alert(
                'Confirmar Logout',
                'Tem certeza que deseja sair?',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        await AsyncStorage.removeItem('isLoggedIn');
                        setIsLoggedIn(false);
                      } catch (error) {
                        Alert.alert('Erro ao fazer logout');
                      }
                    },
                  },
                ]
              );
            },
          }}
        >
          {/* Componente vazio já que o logout é executado no listener */}
          {() => <View />}
        </Tab.Screen>

      </Tab.Navigator>
  );
}
