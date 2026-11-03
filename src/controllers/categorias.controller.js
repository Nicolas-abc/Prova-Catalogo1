export class CategoriasController {
  constructor(categoriasService) {
    this.categoriasService = categoriasService;
  }

  async index(req, res) {
    const categorias = await this.categoriasService.listar();
    res.render('categorias/index', { categorias });
  }

  form(req, res) {
    res.render('categorias/form', { erros: [], categoria: {} });
  }

  async criar(req, res) {
    try {
      await this.categoriasService.criar(req.body);
      res.redirect('/categorias');
    } catch (error) {
      res.status(400).render('categorias/form', {
        erros: [error.message],
        categoria: req.body,
      });
    }
  }
}