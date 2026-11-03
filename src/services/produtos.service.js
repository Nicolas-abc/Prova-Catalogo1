import { AppError } from '../utils/app-error.js';

export class ProdutosService {
  constructor(produtosRepository, categoriasRepository) {
    this.produtosRepository = produtosRepository;
    this.categoriasRepository = categoriasRepository;
  }

  async listar() {
    return await this.produtosRepository.findAll();
  }

  async criar(dados) {
    const { nome, preco, categoriaId } = dados;

    if (!nome || nome.trim() === '') {
      throw new AppError('O nome do produto é obrigatório.', 400);
    }

    const precoNum = Number(preco);
    if (isNaN(precoNum) || precoNum <= 0) {
      throw new AppError('O preço do produto deve ser maior que zero.', 400);
    }

    if (!categoriaId) {
      throw new AppError('A categoria do produto é obrigatória.', 400);
    }

    const categoriaExistente = await this.categoriasRepository.findById(categoriaId);
    if (!categoriaExistente) {
      throw new AppError('A categoria informada não existe.', 400);
    }

    return await this.produtosRepository.create({
      nome: nome.trim(),
      preco: precoNum,
      categoriaId: Number(categoriaId),
    });
  }
}
