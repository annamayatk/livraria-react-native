interface Livro {
  id: number;
  nome: string;
  autor: string;
  imagem: string;
}

export function buscarLivrosPortugues(nome: string): Promise<Livro[]> {
  return fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(nome)}&language=por&limit=20`)
    .then((resposta) => resposta.json())
    .then((dados) => {
      const livrosFiltrados = dados.docs.filter((l: any) => l.language?.includes("por"));

      return livrosFiltrados.map((livro: any, i: number): Livro => {
        return {
          id: i + 1,
          nome: livro.title,
          autor: livro.author_name?.[0] || "Autor desconhecido",
          imagem: livro.cover_i
            ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`
            : "https://via.placeholder.com/100x150?text=Sem+Capa",
        };
      });
    })
    .catch((erro) => {
      console.log("Erro ao buscar livros:", erro);
      return [];
    });
}
