module.exports = function(app){
  var amigos = app.controllers.amigos,
      autenticacao = require('../middleware/autenticacao');

  app.route('/amigos').get(autenticacao, amigos.index);

  app.route('/amigos/show/:id').get(autenticacao, amigos.show);

  app.route('/amigos/chat/:id').get(autenticacao, amigos.chat);
}
