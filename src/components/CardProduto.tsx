import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Share } from "react-native";
import { adicionarDesejo } from "../api/listaDesejos";
import ModalAlert from "./ModalAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Produto {
  id: number;
  nome: string;
  autor: string;
  imagem: string;
}

interface Props {
  produto: Produto;
}

export default function CardProduto({ produto }: Props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');

  const compartilharProduto = async () => {
    try {
      await Share.share({
        message: `Confira este produto: ${produto.nome} de ${produto.autor}!`,
        url: produto.imagem,
        title: produto.nome,
      });
    } catch (error) {
      alert("Erro ao compartilhar: " + error);
    }
  };

  return (
    <>
      <View style={styles.card}>
        <Image source={{ uri: produto.imagem }} style={styles.imagem} />

        <View style={styles.info}>
          <Text style={styles.nome}>{produto.nome}</Text>
          <Text style={styles.autor}>{produto.autor}</Text>
        </View>

        <View style={styles.botoesContainer}>
          <TouchableOpacity 
            style={styles.botao} 
            onPress={async () => {
              const email = await AsyncStorage.getItem("usuarioLogado");
                if (email) {
                  await adicionarDesejo(produto, email);
                  setMensagemModal('Livro adicionado com Sucesso!!!');
                  setModalVisible(true);
                } else {
                  console.log("Usuário não logado.");
                }
              }}> 
            <Text style={styles.botaoTexto}>ADICIONAR À LISTA DE DESEJOS ❤️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.botaoCompartilhar]} onPress={compartilharProduto}>
            <Text style={styles.botaoTexto}>COMPARTILHAR 🔗</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ModalAlert
        visible={modalVisible}
        texto={mensagemModal}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    padding:5,
  },
  imagem: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
    backgroundColor: "#eee",
    borderRadius:20,
  },

  info: {
    padding: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  autor: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  botao: {
    flex: 1,
    backgroundColor: "#F57C00",
    padding: 10,
    justifyContent:"center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 12,
  },
  botaoCompartilhar: {
    backgroundColor: "#4CAF50", 
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    textAlign:"center",
  },
});
