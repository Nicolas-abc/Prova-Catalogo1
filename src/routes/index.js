import { Router } from 'express';
import { CategoriasRepositoryPrisma } from '../repositories/categorias.repository.prisma.js';
import { ProdutosRepositoryPrisma } from '../repositories/produtos.repository.prisma.js';
import { CategoriasService } from '../services/categorias.service.js';
import { ProdutosService } from '../services/produtos.service.js';
import { CategoriasController } from '../controllers/categorias.controller.js';
import { ProdutosController } from '../controllers/produtos.controller.js';
import { validarCategoria, validarProduto } from '../middlewares/validacao.middleware.js';

const router = Router();

const categoriasRepository = new CategoriasRepositoryPrisma();
const produtosRepository = new ProdutosRepositoryPrisma();

const categoriasService = new CategoriasService(categoriasRepository);
const produtosService = new ProdutosService(produtosRepository, categoriasRepository);

const categoriasController = new CategoriasController(categoriasService);
const produtosController = new ProdutosController(produtosService, categoriasService);

router.get('/', (req, res) => res.redirect('/produtos'));

router.get('/categorias', (req, res) => categoriasController.index(req, res));
router.get('/categorias/nova', (req, res) => categoriasController.form(req, res));
router.post('/categorias', validarCategoria, (req, res) => categoriasController.criar(req, res));

router.get('/produtos', (req, res) => produtosController.index(req, res));
router.get('/produtos/novo', (req, res) => produtosController.form(req, res));
router.post('/produtos', async (req, res, next) => {
  const middleware = await validarProduto(categoriasRepository);
  middleware(req, res, () => produtosController.criar(req, res));
});

export default router;
