export async function buscarLivrosPorAssunto(assunto: string) {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${encodeURIComponent(assunto)}.json?limit=10`
    );
    const data = await response.json();

    const produtos = data.works.map((livro: any, index: number) => ({
      id: index + 1,
      nome: livro.title,
      autor: livro.authors?.[0]?.name || "Autor desconhecido",
      imagem: livro.cover_id
        ? `https://covers.openlibrary.org/b/id/${livro.cover_id}-L.jpg`
        : "https://via.placeholder.com/100x150?text=Sem+Capa",
    }));

    return produtos;
  } catch (error) {
    console.error("Erro ao buscar livros por assunto:", error);
    return [];
  }
}
