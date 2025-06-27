import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
}

interface Props {
  produto: Produto;
}

export default function CardProduto({ produto }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: produto.imagem }} style={styles.imagem} />

      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.categoria}>{produto.categoria}</Text>
        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>ADICIONAR A LISTA DE DESEJOS ❤️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  imagem: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoria: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  preco: {
    fontSize: 16,
    color: "#000",
    marginTop: 4,
  },
  botao: {
    backgroundColor: "#F57C00",
    padding: 10,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    
  },
});
