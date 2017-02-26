var url = require('url');

module.exports = function(req,res){
  var createUrl = url.parse(req.url).pathname;
  var updateUrl = !createUrl;
  console.log(createUrl);

  req.assert('nome', 'Informe o seu Nome.').notEmpty();
  if(createUrl == "/usuarios/create"){
    req.assert('email', 'E-mail invalido.').isEmail();
    req.assert('password', 'Sua senha deve conter 6 a 10 caracteres.').len(6,10);
  }
  req.assert('site', 'Site não é uma url valida').isURL();

  var validateErros = req.validationErrors() || [];

  //verificar se a senha confere
  if(req.body.password != req.body.password_confirmar){
    validateErros.push({msg: 'Senha não confere'});
  }

  if(validateErros.length > 0){
    validateErros.forEach(function(e){
      req.flash('erro', e.msg);
    });

    return false;
  }else{
    return true;
  }
}
