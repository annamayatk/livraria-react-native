import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Produto {
  id: number;
  nome: string;
  autor: string;
  imagem: string;
}

const DESEJOS_KEY = "@livrariaApp:wishlist";


  // Busca a lista de desejos salva.
 
export async function getDesejos(): Promise<Produto[]> {
  const jsonValue = await AsyncStorage.getItem(DESEJOS_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}


  // Adiciona um produto na lista.
 
export async function adicionarDesejo(produto: Produto): Promise<void> {
  const desejosAtuais = await getDesejos();
  const novaLista = [...desejosAtuais, produto];
  const jsonValue = JSON.stringify(novaLista);
  await AsyncStorage.setItem(DESEJOS_KEY, jsonValue);
  
  // Para sabermos que funcionou, podemos ver no console do terminal.
  console.log(`"${produto.nome}" adicionado à lista de desejos.`);
}

// Remove um produto da lista de desejos.
 
export async function removerDesejo(nomeLivro: string): Promise<Produto[]> {
  const desejosAtuais = await getDesejos();
  const novaLista = desejosAtuais.filter((p) => p.nome !== nomeLivro);
  const jsonValue = JSON.stringify(novaLista);
  await AsyncStorage.setItem(DESEJOS_KEY, jsonValue);
  
  console.log(`"${nomeLivro}" removido da lista de desejos.`);
  return novaLista;
}