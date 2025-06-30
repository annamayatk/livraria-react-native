import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import ModalAlert from '../ModalAlert';

interface ModalCadastroProps {
    visible: boolean;
    onClose: () => void;
}

interface Usuario {
    nome: string;
    email: string;
    senha: string;
}

export default function ModalCadastro({ visible, onClose }: ModalCadastroProps) {

    const [nome, setNome] =useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const showAlert = (message: string) => {
        setAlertMessage(message);
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
        setAlertMessage('');
    };

    const handleCadastro = async (): Promise<void> => {
        if (!nome || !email || !password) {
            showAlert('Preencha todos os campos');
            return;
        }

        try {
            // Buscar lista de usuários existente
            const userData = await AsyncStorage.getItem('usuarios');
            const usuarios: Usuario[] = userData ? JSON.parse(userData) : [];

            // Verificar se email já existe
            const emailExiste = usuarios.find(u => u.email === email);
            if (emailExiste) {
                showAlert('Email já cadastrado');
                return;
            }

            // Adicionar novo usuário
            const novoUsuario: Usuario = { nome, email, senha: password };
            usuarios.push(novoUsuario);

            // Salvar no AsyncStorage
            await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));

            showAlert('Usuário cadastrado com sucesso');
            
            // Limpar campos e fechar modal
            setNome('');
            setEmail('');
            setPassword('');
            onClose();

        } catch (error) {
            showAlert('Erro ao cadastrar usuário');
        }
    };

    const handleClose = (): void => {
        setNome('');
        setEmail('');
        setPassword('');
        onClose();
    };

    return (
        <>
            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Usuário</Text>
                        
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o nome"
                                value={nome}
                                onChangeText={setNome}
                                keyboardType='default'
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o e-mail"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite a senha"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.saveButton} onPress={handleCadastro}>
                                <Text style={styles.saveButtonText}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ModalAlert
                    visible={alertVisible}
                    texto={alertMessage}
                    onClose={closeAlert}
                />
        </>
    );
}

