import { View, Text, Alert, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

interface ModalLogoutProps {
    visible: boolean;
    onClose: ()=> void;
    setIsLoggedIn: (value:boolean) =>void;
}

export default function ModalLogout({visible, onClose, setIsLoggedIn}:ModalLogoutProps) {

    const handleLogout = async () => {
        try{
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.removeItem('usuarioLogado');
            await AsyncStorage.removeItem('nomeLogado');
            setIsLoggedIn(false);
            onClose();
        } catch (error){
            Alert.alert('Erro ao fazer logout');
        }
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        
                        <Text style={styles.title}>Quer mesmo ir embora???</Text>
                        <Text style={styles.message}>Fica mais um pouquinho...</Text>
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button,styles.cancelButton]} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Continuar...</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button,styles.logoutButton]} onPress={handleLogout}>
                                <Text style={styles.logoutButtonText}>bye bye...</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
        </Modal>
    )
}