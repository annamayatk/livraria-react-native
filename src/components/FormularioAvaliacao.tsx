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
    comentario: string;
    nota: number;
    livro: string;
  }) => void;
}

export default function FormularioAvaliacao({ onEnviar }: Props) {
  const [usuario, setUsuario] = useState("");
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState("5");
  const [termoBusca, setTermoBusca] = useState("");
  const [livros, setLivros] = useState<Livro[]>([]);
  const [livroSelecionado, setLivroSelecionado] = useState("");

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
      comentario,
      nota: notaConvertida,
      livro: livroSelecionado,
    });

    setUsuario("");
    setComentario("");
    setNota("5");
    setTermoBusca("");
    setLivroSelecionado("");
    setLivros([]);
  }

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.input}
        placeholder="Seu nome"
        value={usuario}
        onChangeText={setUsuario}
      />

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

      <Button title="Enviar Avaliação" onPress={enviarAvaliacao} />
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
});
