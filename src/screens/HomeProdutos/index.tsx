import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { styles } from "./style";
import CardProduto from "../../components/CardProduto";
import { buscarLivrosPortugues } from "../../api/produtos"; 

interface Produto {
  id: number;
  nome: string;
  autor: string;
  imagem: string;
}

export default function HomeProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const carregarLivros = async () => {
    const resultado = await buscarLivrosPortugues();
    setProdutos(resultado);
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardProduto produto={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
