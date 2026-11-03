export function validarCategoria(req, res, next) {
  const { nome } = req.body;
  const erros = [];

  if (!nome || nome.trim() === '') {
    erros.push('O nome da categoria é obrigatório.');
  }

  if (erros.length > 0) {
    return res.status(400).render('categorias/form', { erros, categoria: req.body });
  }

  next();
}

export async function validarProduto(categoriasRepository) {
  return async (req, res, next) => {
    const { nome, preco, categoriaId } = req.body;
    const erros = [];

    if (!nome || nome.trim() === '') {
      erros.push('O nome do produto é obrigatório.');
    }

    const precoNum = Number(preco);
    if (!preco || isNaN(precoNum) || precoNum <= 0) {
      erros.push('O preço deve ser maior que zero.');
    }

    if (!categoriaId) {
      erros.push('Selecione uma categoria.');
    } else {
      const cat = await categoriasRepository.findById(categoriaId);
      if (!cat) {
        erros.push('A categoria selecionada não existe.');
      }
    }

    if (erros.length > 0) {
      const categorias = await categoriasRepository.findAll();
      return res.status(400).render('produtos/form', {
        erros,
        produto: req.body,
        categorias,
      });
    } 

    next();
  };
}
