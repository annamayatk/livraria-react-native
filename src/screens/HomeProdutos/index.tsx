import React, { useState } from "react";
import { View, TextInput, FlatList } from "react-native";
import { styles } from "./style";
import CardProduto from "../../components/CardProduto";

/* Usando o script sql - para inserir os dados, enquanto a API nao esta conectada*/
const produtosMock = [
  {
    id: 1,
    nome: "O Senhor dos Anéis",
    preco: 49.9,
    categoria: "Fantasia",
    imagem: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
  },
  {
    id: 2,
    nome: "Duna",
    preco: 59.9,
    categoria: "Ficção Científica",
    imagem: "https://covers.openlibrary.org/b/id/11153237-L.jpg",
  },
  {
    id: 3,
    nome: "It: A Coisa",
    preco: 39.9,
    categoria: "Terror",
    imagem: "https://covers.openlibrary.org/b/id/10523376-L.jpg",
  },
  {
    id: 4,
    nome: "O Código Da Vinci",
    preco: 34.9,
    categoria: "Suspense",
    imagem: "https://covers.openlibrary.org/b/id/8278326-L.jpg",
  },
  {
    id: 5,
    nome: "Sapiens: Uma Breve História da Humanidade",
    preco: 44.9,
    categoria: "História",
    imagem: "https://covers.openlibrary.org/b/id/9253505-L.jpg",
  },
  {
    id: 6,
    nome: "Steve Jobs",
    preco: 39.9,
    categoria: "Biografia",
    imagem: "https://covers.openlibrary.org/b/id/8231999-L.jpg",
  },
  {
    id: 7,
    nome: "O Poder do Hábito",
    preco: 34.9,
    categoria: "Autoajuda",
    imagem: "https://covers.openlibrary.org/b/id/8175356-L.jpg",
  },
  {
    id: 8,
    nome: "Clean Code",
    preco: 79.9,
    categoria: "Programação",
    imagem: "https://covers.openlibrary.org/b/id/9641655-L.jpg",
  },
  {
    id: 9,
    nome: "A Revolução dos Bichos",
    preco: 29.9,
    categoria: "Ficção",
    imagem: "https://covers.openlibrary.org/b/id/10504794-L.jpg",
  },
  {
    id: 10,
    nome: "O Hobbit",
    preco: 39.9,
    categoria: "Fantasia",
    imagem: "https://covers.openlibrary.org/b/id/8167896-L.jpg",
  },
  {
    id: 11,
    nome: "1984",
    preco: 29.9,
    categoria: "Ficção",
    imagem: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: 12,
    nome: "A Arte da Guerra",
    preco: 24.9,
    categoria: "Filosofia",
    imagem: "https://covers.openlibrary.org/b/id/8275285-L.jpg",
  },
  {
    id: 13,
    nome: "O Príncipe",
    preco: 29.9,
    categoria: "Política",
    imagem: "https://covers.openlibrary.org/b/id/8281994-L.jpg",
  },
  {
    id: 14,
    nome: "A Coragem de Ser Imperfeito",
    preco: 27.9,
    categoria: "Autoajuda",
    imagem: "https://covers.openlibrary.org/b/id/10523380-L.jpg",
  },
  {
    id: 15,
    nome: "Mais esperto que o diabo",
    preco: 24.9,
    categoria: "Autoajuda",
    imagem: "https://covers.openlibrary.org/b/id/9611885-L.jpg",
  },
  {
    id: 16,
    nome: "A Menina que Roubava Livros",
    preco: 34.9,
    categoria: "Drama",
    imagem: "https://covers.openlibrary.org/b/id/9641862-L.jpg",
  },
  {
    id: 17,
    nome: "Orgulho e Preconceito",
    preco: 29.9,
    categoria: "Romance",
    imagem: "https://covers.openlibrary.org/b/id/8235082-L.jpg",
  },
  {
    id: 18,
    nome: "Segredos Da Mente Milionaria",
    preco: 22.9,
    categoria: "Finanças",
    imagem: "https://covers.openlibrary.org/b/id/11018495-L.jpg",
  },
  {
    id: 19,
    nome: "A Cabana",
    preco: 32.9,
    categoria: "Ficção",
    imagem: "https://covers.openlibrary.org/b/id/8195462-L.jpg",
  },
  {
    id: 20,
    nome: "O Homem em Busca de um Sentido",
    preco: 26.9,
    categoria: "Psicologia",
    imagem: "https://covers.openlibrary.org/b/id/8235075-L.jpg",
  },
];

export default function HomeProdutos() {
  const [faixa1, setFaixa1] = useState("");
  const [faixa2, setFaixa2] = useState("");

  return (
    <View style={styles.container}>
      <FlatList
        data={produtosMock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardProduto produto={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
