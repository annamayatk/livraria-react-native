import React, { JSX, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeProdutos from "../screens/HomeProdutos";
import { Feather } from "@expo/vector-icons";
import Avaliacoes from "../screens/Avaliacoes";
import ListaDesejos from "../screens/ListaDesejos";
import Login from "../screens/Login";
import { View } from "react-native";
import ModalLogout from "../components/ModalLogout";
import Splash from "../screens/Splash";

const Tab = createBottomTabNavigator();

interface AppRouterProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export default function AppRouter({ isLoggedIn, setIsLoggedIn }: AppRouterProps): JSX.Element {

  const [showSplash, setShowSplash] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  //======= Executa o Splash primeiro ==============
  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />
  }

  //====== Verifica se logado (verifica LocalStorage vazio) ======== 
  if (!isLoggedIn) {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{display:'none'} }}>
        <Tab.Screen
          name="Login"
          options={{ tabBarButton: () => null }}
        >
          {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  //===== pula direto para pagina inicial =============
  return (
    <>
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
              // Executa o modal de logout
              setShowLogoutModal(true);
            },
          }}
        >
          {/* Componente vazio já que o logout é executado no listener */}
          {() => <View />}
        </Tab.Screen>

      </Tab.Navigator>

      <ModalLogout
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
