import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getDesejos, removerDesejo, Produto } from "../../api/listaDesejos";
import { Feather } from "@expo/vector-icons";
import { styles } from "./style"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaDesejos() {
  const [desejos, setDesejos] = useState<Produto[]>([]);
  const [emailLogado, setEmailLogado] = useState<string | null>(null);
  const [nomeLogado, setNomeLogado] = useState<string | null>(null);


  useFocusEffect(
    useCallback(() => {
      async function carregarDados() {
        const email = await AsyncStorage.getItem('usuarioLogado');
        setEmailLogado(email);
        setNomeLogado(await AsyncStorage.getItem('nomeLogado'));
        if (email){
          const dadosSalvos = await getDesejos(email);
          setDesejos(dadosSalvos);
        }
      }
      carregarDados();
    }, [])
  );
  
  const handleRemoverDesejo = async (nomeLivro: string, email: string | null) => {
    if (!email) return;
    const novaLista = await removerDesejo(nomeLivro, email);
    setDesejos(novaLista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Desejos</Text>
      <Text style={styles.subtitulo}>{nomeLogado}</Text>
      
      {desejos.length > 0 ? (
        <FlatList
          data={desejos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
                <Text style={styles.autor}>{item.autor}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoverDesejo(item.nome, emailLogado)}>
                <Feather name="trash-2" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.textoVazio}>Sua lista de desejos está vazia.</Text>
      )}
    </View>
  );
}