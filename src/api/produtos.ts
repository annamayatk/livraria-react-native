function embaralharArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export async function buscarLivrosPortugues() {
  const autoresBrasileiros = [
    "machado de assis",
    "jose de alencar",
    "cecilia meireles",
    "monteiro lobato",
    "lima barreto",
    "graciliano ramos",
    "jorge amado",
    "raquel de queiroz",
    "ariano suassuna",
    "conceição evaristo",
    "rubem fonseca",
    "paulo freire",
    "fernando sabino",
    "luiz ruffato",
    "chico buarque",
    "lya luft",
    "cristovão tezza",
    "milton hatoum",
    "marçal aquino",
    "augusto cury",
    "paulo coelho"
  ];

  try {
    const todasPromessas = autoresBrasileiros.map(async (autor) => {
      const response = await fetch(
        `https://openlibrary.org/search.json?author=${encodeURIComponent(autor)}&language=por&limit=10`
      );
      const data = await response.json();

      return data.docs
        .filter((livro: any) =>
          livro.title &&
          livro.language?.includes("por") &&
          livro.cover_i 
        )
        .map((livro: any) => ({
          id: livro.key?.split("/").pop(),
          nome: livro.title,
          autor: livro.author_name?.[0] || autor,
          imagem: `https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`,
        }));
    });

    const resultados = await Promise.all(todasPromessas);
    const todosLivros = resultados.flat();
    const livrosEmbaralhados = embaralharArray(todosLivros);
    const livrosSelecionados = livrosEmbaralhados.slice(0, 25);

    console.log("Total com imagem:", todosLivros.length);
    console.log("Exibindo:", livrosSelecionados.length);

    return livrosSelecionados;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
}
