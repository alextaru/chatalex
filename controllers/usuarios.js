module.exports = function(app){

  var validacao = require('../validacoes/usuarios'),
      Usuario   = app.models.usuarios;

  var UsuarioController = {
    index: function(req,res){

      Usuario.find(function(err,dados){
        if(err){
          req.flash('erro', 'Erro ao buscar usuários: '+err);
          res.redirect('/usuarios');
        }else{
          res.render('usuarios/index', {lista: dados});
        }

      });
    },

    create: function(req,res){
      res.render('usuarios/create', {user: new Usuario()});
    },

    post: function(req,res){
      if(validacao(req,res)){
        var model      = new Usuario();
        model.nome     = req.body.nome;
        model.email    = req.body.email;
        model.site     = req.body.site;
        model.password = model.generateHash(req.body.password);

        Usuario.findOne({'email': model.email}, function(err,data){
          if(data){
            req.flash('erro', 'E-mail encontra-se cadastrado, tente outro e-mail');
            res.render('usuarios/create', {user: model});
          }else{
            model.save(function(err){
              if(err){
                req.flash('erro', 'Erro ao cadastar: '+err);
                res.render('usuarios/create', {user: req.body});
              }else{
                req.flash('info', 'Resgistro cadastrado com sucesso!');
                res.redirect('/usuarios');
              }
            });
          }
        });
      }else{
        res.render('usuarios/create', {user: req.body});
      }
    },

    show: function(req,res){
      Usuario.findById(req.params.id, function(err,dados){
        if(err){
          req.flash('erro', 'Erro ao visualizar usuarios '+err);
          res.redirect('/usuarios');
        }else{
          res.render('usuarios/show', {dados: dados});
        }
      });
    },

    delete: function(req,res){
      Usuario.remove({_id: req.params.id}, function(err){
        if(err){
          req.flash('erro', 'Erro ao excluir usuarios '+err);
          res.redirect('/usuarios');
        }else{
          req.flash('info', 'Resgistro excluido com sucesso!');
          res.redirect('/usuarios');
        }
      });
    },

    edit: function(req,res){
      Usuario.findById(req.params.id, function(err,dados){
        if(err){
          req.flash('erro', 'Erro ao editar usuarios '+err);
          res.redirect('/usuarios');
        }else{
          res.render('usuarios/edit', {dados: dados});
        }
      });
    },

    update: function(req,res){
      if(validacao(req,res)){
        Usuario.findById(req.params.id, function(err,dados){
          var model = dados;
          model.nome = req.body.nome;
          model.site = req.body.site;

          model.save(function(err){
            if(err){
              req.flash('erro', 'Erro ao editar usuarios '+err);
              res.render('/usuarios/edit', {dados: model});
            }else{
              req.flash('info', 'Resgistro Atualizado com sucesso!');
              res.redirect('/usuarios');
            }
          });
        });
      }else{
        res.render('usuarios/edit', {dados: req.body});
      }
    }

  }

  return UsuarioController;
}
