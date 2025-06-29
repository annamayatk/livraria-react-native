import { View, Text, Modal } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import React, { useEffect, useState } from 'react'
import ModalAlert from '../ModalAlert';

export default function MonitorConexao() {

    const [isConnected, setIsConnected] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() =>{

        NetInfo.fetch().then(state =>{              //conexao inicial
            const connected = !!(state.isConnected && state.isInternetReachable);
            console.log('Conexao Inicial: ',{conectado:state.isConnected, tipo:state.type});
            setIsConnected(connected);
        });
        const unsubscribe = NetInfo.addEventListener(state => {   //monitora conexao
            const connected = !!(state.isConnected && state.isInternetReachable);
            console.log('Mudança de conexão: ',{conectado:state.isConnected, tipo:state.type});
            
            if(!connected && isConnected){ //mostra o modalAlert se perder a conexao
                console.log('Conexao perdida');
                setShowModal(true);
            }
            setIsConnected(connected);
        });
        return () => unsubscribe();
    },[]);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <ModalAlert
        visible={showModal}
        texto='Você está sem conexão, Verifique a rede e tente novamente'
        onClose={handleCloseModal}
        />
    )
}