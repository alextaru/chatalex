module.exports = function(app){
  var home         = app.controllers.home,
      autenticacao = require('../middleware/autenticacao');

  app.route('/').get(home.login)
                .post(home.autenticacao);

  app.route('/home').get(autenticacao, home.index);

  app.route('/logout').get(autenticacao, home.logout);
}
