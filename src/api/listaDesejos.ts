import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Produto {
  id: number;
  nome: string;
  autor: string;
  imagem: string;
}

const DESEJOS_KEY = "@livrariaApp:wishlist";


  // Busca a lista de desejos salva.
 
export async function getDesejos(email: string): Promise<Produto[]> {
  const chave = `@lista_desejos_${email}`;
  const json = await AsyncStorage.getItem(chave);
  return json ? JSON.parse(json) : [];
}


  // Adiciona um produto na lista.
 
export async function adicionarDesejo(produto: Produto, email: string): Promise<void> {
  const chave = `@lista_desejos_${email}`;
  const desejosAtuais = await getDesejos(email); // agora com email
  const novaLista = [...desejosAtuais, produto];
  const jsonValue = JSON.stringify(novaLista);
  await AsyncStorage.setItem(chave, jsonValue);
  
  // Para sabermos que funcionou, podemos ver no console do terminal.
  console.log(`"${produto.nome}" adicionado à lista de desejos.`);
}

// Remove um produto da lista de desejos.
 
export async function removerDesejo(nomeLivro: string, email: string): Promise<Produto[]> {
  const chave = `@lista_desejos_${email}`;
  const json = await AsyncStorage.getItem(chave);
  const lista = json ? JSON.parse(json) : [];

  const novaLista = lista.filter((item: Produto) => item.nome !== nomeLivro);
  await AsyncStorage.setItem(chave, JSON.stringify(novaLista));

  return novaLista;
}