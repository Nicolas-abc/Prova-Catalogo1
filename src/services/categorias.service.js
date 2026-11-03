import { AppError } from '../utils/app-error.js';

export class CategoriasService {
  constructor(categoriasRepository) {
    this.categoriasRepository = categoriasRepository;
  }

  async listar() {
    return await this.categoriasRepository.findAll();
  }

  async criar(dados) {
    if (!dados.nome || dados.nome.trim() === '') {
      throw new AppError('O nome da categoria é obrigatório.', 400);
    }
    return await this.categoriasRepository.create({ nome: dados.nome.trim() });
  }
}