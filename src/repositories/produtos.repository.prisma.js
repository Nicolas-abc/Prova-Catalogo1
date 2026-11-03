import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ProdutosRepositoryPrisma {
  async findAll() {
    return await prisma.produto.findMany({
      include: { categoria: true },
      orderBy: { id: 'asc' },
    });
  }

  async create(dados) {
    return await prisma.produto.create({
      data: {
        nome: dados.nome,
        preco: Number(dados.preco),
        categoriaId: Number(dados.categoriaId),
      },
    });
  }
}