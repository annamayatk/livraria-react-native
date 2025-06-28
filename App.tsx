import React, { useState, useEffect, JSX } from "react"; 
import AppRouter from "./src/routes/AppRouter";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Login from "./src/screens/Login";

export default function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Verificar se usuário já está logado ao iniciar o app
  useEffect(() => {
    const checkLoginStatus = async (): Promise<void> => {
      try {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn');
        if (loginStatus === 'true') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Erro ao verificar status de login');
      }
    };
    checkLoginStatus();
  }, []);
  
  return (
    <NavigationContainer>
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
  );
}
