import { View, Text, ImageBackground, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, { JSX, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import imgFundo from '../../img/Fundo.jpg'
import imgLogin from '../../img/Login.png'
import { TextInput } from 'react-native-paper';
import ModalCadastro from '../../components/ModalCadastro';
import ModalAlert from '../../components/ModalAlert';
import TextMove from '../../components/TextMove';

interface Usuario{
    email:string;
    senha:string;
}

interface LoginProps {
    setIsLoggedIn: (value: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps): JSX.Element {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false); //modal de cadastro de novo usuário
    const [alertVisible, setAlertVisible] = useState<boolean>(false); //modal de alerta
    const [alertTexto, setAlertTexto] = useState<string>('');

    //========= setup do modalAlert ========
    const showAlert = (texto: string) => {
        setAlertTexto(texto);
        setAlertVisible(true);
    }

    const handleLogin = async (): Promise<void> => {
        try{
            const userData = await AsyncStorage.getItem('usuarios');
            const usuarios = userData? JSON.parse(userData):[];

            const usuarioExistente = usuarios.find(
                (u: {email:string; senha:string}) =>
                    u.email === email && u.senha === password
            );

            if(usuarioExistente){
                await AsyncStorage.setItem('isLoggedIn', 'true');
                showAlert('Login realizado com sucesso');
                setIsLoggedIn(true);
            } else {
                showAlert('usuário ou senha inválido');
                setEmail('');
                setPassword('');
            }
        } catch (error){
            showAlert('Erro ao tentar logar');
        }
    };

    const abrirModal = (): void => {
        setModalVisible(true);
    };

    const fecharModal = (): void => {
        setModalVisible(false);
    };

    return (
        <ImageBackground source={imgFundo} style={styles.imgFundo}>
            {/* <TextMove textoMove='Teste'/> */}
            
            <View style={styles.container}>
                <Image source={imgLogin} style={styles.img} resizeMode='contain'/>
            </View>

            <View style={styles.contInsert}>
                <Text style={styles.texto}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder='insira o e-mail'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    />
            </View>

            <View style={styles.contInsert}>
                <Text style={styles.texto}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder='insira a senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    />
            </View>

            <TouchableOpacity onPress={handleLogin} style={{alignItems: 'center'}}>
                <Text style={styles.touch}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={abrirModal} style={{alignItems: 'center'}}>
                <Text style={styles.touchNovo}>Novo usuário</Text>
            </TouchableOpacity>

            <ModalCadastro
                visible={modalVisible}
                onClose={fecharModal}
                />
            
            <ModalAlert
                visible={alertVisible}
                texto={alertTexto}
                onClose={() => setAlertVisible(false)}
                />

        </ImageBackground>
)
}