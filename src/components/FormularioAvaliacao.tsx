import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { buscarLivrosPortugues } from "../api/avaliacoes";


interface Livro {
  id: number;
  nome: string;
  autor: string;
  imagem: string;
}

interface Props {
  onEnviar: (dados: {
    usuario: string;
    livro: string;
    comentario: string;
    nota: number;
  }) => void;
}

export default function FormularioAvaliacao({ onEnviar }: Props) {
  const [usuario, setUsuario] = useState("");
  const [termoBusca, setTermoBusca] = useState("");
  const [livros, setLivros] = useState<Livro[]>([]);
  const [livroSelecionado, setLivroSelecionado] = useState("");
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState("5");
  
  useEffect(() => {
    if (termoBusca.length >= 3) {
      buscarLivrosPortugues(termoBusca).then(setLivros);
    } else {
      setLivros([]);
    }
  }, [termoBusca]);

  function enviarAvaliacao() {
    if (!usuario || !comentario || !nota || !livroSelecionado) {
      Alert.alert("Preencha todos os campos.");
      return;
    }

    const notaConvertida = parseInt(nota);
    if (isNaN(notaConvertida) || notaConvertida < 1 || notaConvertida > 5) {
      Alert.alert("A nota deve ser entre 1 e 5.");
      return;
    }

    onEnviar({
      usuario,
      livro: livroSelecionado,
      comentario,
      nota: notaConvertida,
      
    });

    setUsuario("");
    setTermoBusca("");
    setLivroSelecionado("");
    setLivros([]);
    setComentario("");
    setNota("5");
    
  }

  return (
  <View style={estilos.container}>
    <View style={estilos.caixaTitulo}>
    <Text style={estilos.titulo}>Compartilhe sua experiência literária 📖 </Text>
    </View>

    <TextInput
      style={estilos.input}
      placeholder="Seu nome"
      value={usuario}
      onChangeText={setUsuario}
    />

    <TextInput
      style={estilos.input}
      placeholder="Buscar livro por nome"
      value={termoBusca}
      onChangeText={setTermoBusca}
    />

    {termoBusca.length >= 3 && !livroSelecionado && (
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.livroItem}
            onPress={() => {
              setLivroSelecionado(item.nome);
              setTermoBusca(item.nome);
              setLivros([]);
            }}
          >
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    )}

    {livroSelecionado ? (
      <Text style={estilos.livroSelecionado}>
        Livro selecionado: {livroSelecionado}
      </Text>
    ) : null}

    <TextInput
      style={estilos.input}
      placeholder="Comentário"
      value={comentario}
      onChangeText={setComentario}
      multiline
    />

    <TextInput
      style={estilos.input}
      placeholder="Nota (1 a 5)"
      keyboardType="numeric"
      value={nota}
      onChangeText={setNota}
    />

    <Button title="Enviar Avaliação" onPress={enviarAvaliacao} color='#F57C00'/>
  </View>
);
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  livroItem: {
    padding: 8,
    backgroundColor: "#eee",
    marginBottom: 4,
    borderRadius: 6,
  },
  livroSelecionado: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  caixaTitulo: {
  backgroundColor: "#FFE0B2",
  padding: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#FFB74D", 
  marginBottom: 20,
  alignItems: "center",
},
  botao:{
    backgroundColor:'#F57C00'
  }

});
