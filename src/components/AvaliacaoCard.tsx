import React from "react";
import { View, Text } from "react-native";
import { styles } from "../screens/Avaliacoes/style"; 

interface Avaliacao {
  id: string;
  usuario: string;
  livro: string;
  comentario: string;
  nota: number;
  data: string;
}

interface Props {
  avaliacao: Avaliacao;
}

export default function AvaliacaoCard({ avaliacao }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{avaliacao.livro}</Text>
      <Text style={styles.comentario}>“{avaliacao.comentario}”</Text>
      <Text style={styles.usuario}>⭐ {avaliacao.nota} - {avaliacao.usuario}</Text>
      <Text style={styles.data}>{avaliacao.data}</Text>
    </View>
  );
}
