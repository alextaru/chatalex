module.exports = function(app){

  var Amigos = app.models.usuarios,
      validacao = require('../validacoes/amigos');

  var AmigosController = {
    index: function(req,res){
        Amigos.find(function(err,dados){
          if(err){
            req.flash('erro', 'Errp ao carregar: '+err);
            res.render('amigos/index',{lista: null});
          }
          res.render('amigos/index', {lista:dados});
        });
    },

    show: function(req,res){
      Amigos.findById(req.params.id, function(err,dados){
        if(err){
          req.flash('erro', 'Erro ao carregar amigos: '+err);
          res.redirect('/amigos');
        }else{
          res.render('amigos/show', {model: dados});
        }
      });
    },

    chat: function(req,res){
      Amigos.findById(req.params.id, function(err,dados){
        var model = dados;
        if(err){
          req.flash('erro', 'Erro ao entrar no chat');
          res.redirect('/amigos');
        }else{
          var resultados = {email: model.email,
                            usuario: model.nome};
          res.render('amigos/chat',resultados);
        }
      });
    }
  }
  return AmigosController;
}
