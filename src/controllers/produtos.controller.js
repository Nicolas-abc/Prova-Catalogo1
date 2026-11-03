export class ProdutosController {
  constructor(produtosService, categoriasService) {
    this.produtosService = produtosService;
    this.categoriasService = categoriasService;
  }

  async index(req, res) {
    const produtos = await this.produtosService.listar();
    res.render('produtos/index', { produtos });
  }

  async form(req, res) {
    const categorias = await this.categoriasService.listar();
    res.render('produtos/form', { erros: [], produto: {}, categorias });
  }

  async criar(req, res) {
    try {
      await this.produtosService.criar(req.body);
      res.redirect('/produtos');
    } catch (error) {
      const categorias = await this.categoriasService.listar();
      res.status(400).render('produtos/form', {
        erros: [error.message],
        produto: req.body,
        categorias,
      });
    }
  }
}