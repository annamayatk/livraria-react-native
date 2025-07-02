import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { styles } from "./style";
import FormularioAvaliacao from "../../components/FormularioAvaliacao";
import AvaliacaoCard from "../../components/AvaliacaoCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextMove from '../../components/TextMove';

interface Avaliacao {
  id: string;
  usuario: string;
  livro: string;
  comentario: string;
  nota: number;
  data: string;
}

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  const CHAVE_STORAGE = "@avaliacoes_livraria";

  const carregarAvaliacoes = async () => {
    try {
      const json = await AsyncStorage.getItem(CHAVE_STORAGE);
      if (json) {
        const dados = JSON.parse(json);
        setAvaliacoes(dados);
      }
    } catch (erro) {
      console.error("Erro ao carregar avaliações:", erro);
    }
  };

  const salvarAvaliacoes = async (novas: Avaliacao[]) => {
    try {
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novas));
    } catch (erro) {
      console.error("Erro ao salvar avaliações:", erro);
    }
  };

  const adicionarAvaliacao = (dados: {
    usuario: string;
    livro: string;
    comentario: string;
    nota: number;
    
  }) => {
    const nova: Avaliacao = {
      id: Date.now().toString(),
      usuario: dados.usuario,
      comentario: dados.comentario,
      nota: dados.nota,
      livro: dados.livro,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    const atualizadas = [nova, ...avaliacoes];
    setAvaliacoes(atualizadas);
    salvarAvaliacoes(atualizadas);
  };

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  return (
      
  <View>
  <TextMove textoMove='"Ler é viajar sem sair do lugar."'/>
      <View style={styles.card}>
      <FormularioAvaliacao onEnviar={adicionarAvaliacao} />
      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AvaliacaoCard avaliacao={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  </View>
  );
}
