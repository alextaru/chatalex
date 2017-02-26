module.exports = function(app){

  var usuario      = app.controllers.usuarios,
      autenticacao = require('../middleware/autenticacao');

  app.route('/usuarios').get(autenticacao, usuario.index);

  app.route('/usuarios/create').get(autenticacao, usuario.create)
                               .post(usuario.post);

  app.route('/usuarios/show/:id').get(autenticacao, usuario.show);

  app.route('/usuarios/delete/:id').post(usuario.delete);

  app.route('/usuarios/edit/:id').get(autenticacao, usuario.edit)
                                 .post(usuario.update);
}
