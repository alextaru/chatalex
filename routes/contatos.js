module.exports = function(app){
  var contato = app.controllers.contatos,
      autenticacao = require('../middleware/autenticacao');

  app.route('/contatos/:id').get(autenticacao, contato.index);

  app.route('/contatos/create/:id').get(autenticacao, contato.create)
                                   .post(contato.post);

  app.route('/contatos/delete/:id/:amigo').post(contato.excluir);
}
