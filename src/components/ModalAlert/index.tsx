import { View, Text, Modal, TouchableOpacity} from 'react-native'
import React from 'react'
import { styles } from './styles';

export default function ModalAlert({visible, texto, onClose}:{
    visible:boolean;
    texto:string;
    onClose:()=> void;}) {

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            >
                {/* <TouchableWithoutFeedback onPress={onClose}> */}

                    <View style={styles.overlay}>

                        {/* <TouchableWithoutFeedback> */}

                            <View style={styles.modalContainer}>
                                
                                <Text style={styles.title}>Atenção!!!</Text>
                                <Text style={styles.message}>{texto}</Text>
                                
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onClose}>
                                        <Text style={styles.logoutButtonText}>OK</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        {/* </TouchableWithoutFeedback> */}
                    </View>
                {/* </TouchableWithoutFeedback> */}
        </Modal>
    );
}