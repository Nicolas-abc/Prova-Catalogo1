import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class CategoriasRepositoryPrisma {
  async findAll() {
    return await prisma.categoria.findMany({ orderBy: { id: 'asc' } });
  }

  async findById(id) {
    return await prisma.categoria.findUnique({ where: { id: Number(id) } });
  }

  async create(dados) {
    return await prisma.categoria.create({ data: { nome: dados.nome } });
  }
}
