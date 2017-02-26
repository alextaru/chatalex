module.exports = function(app){

  var Usuario    = app.models.usuarios;
      nodemailer = require('nodemailer');

  var HomeController = {
    index: function(req,res){
      res.render('home/index');
    },

    login: function(req,res){
      res.render('home/login');
    },

    autenticacao: function(req,res){
      var usuario  = new Usuario(),
          email    = req.body.email,
          password = req.body.password;

      Usuario.findOne({'email': email}, function(err,data){

        if(err){
          req.flash('erro', 'Erro ao entrar no sistema: '+err);
          res.redirect('/');
        }else if(!data){
            req.flash('erro', 'E-mail não encontado!');
            res.redirect('/');
        }else if(!usuario.validPassword(password, data.password)){
          req.flash('erro', 'Senha não confere!');
          res.redirect('/');
        }else{
          req.session.usuario = data;
          res.redirect('/home');
        }
      });
    },

    logout: function(req,res){
      req.session.destroy();
      res.redirect('/');
    }
  }

  return HomeController;
}
