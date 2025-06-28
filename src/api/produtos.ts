const autoresBrasileiros = [
  "machado de assis",
  "jose de alencar",
  "cecilia meireles",
  "monteiro lobato",
  "lima barreto",
  "augusto cury"
];

function embaralharArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export async function buscarLivrosPortugues() {
  try {
    const todasPromessas = autoresBrasileiros.map(async (autor) => {
      const response = await fetch(
        `https://openlibrary.org/search.json?author=${encodeURIComponent(
          autor
        )}&language=por&limit=10`
      );
      const data = await response.json();

      return data.docs
        .filter((livro: any) => livro.language?.includes("por"))
        .map((livro: any) => ({
          nome: livro.title,
          autor: livro.author_name?.[0] || "Autor desconhecido",
          imagem: livro.cover_i
            ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`
            : "https://via.placeholder.com/100x150?text=Sem+Capa",
        }));
    });

    const resultados = await Promise.all(todasPromessas);
    const todosLivros = resultados.flat();

    // Elimina duplicados por título
    const livrosUnicosMap = new Map<string, any>();
    for (const livro of todosLivros) {
      if (!livrosUnicosMap.has(livro.nome)) {
        livrosUnicosMap.set(livro.nome, livro);
      }
    }

    const livrosUnicos = Array.from(livrosUnicosMap.values());
    const embaralhados = embaralharArray(livrosUnicos);

    return embaralhados.slice(0, 10).map((livro, index) => ({
      id: index + 1,
      ...livro,
    }));
  } catch (error) {
    console.error("Erro ao buscar livros em português:", error);
    return [];
  }
}
