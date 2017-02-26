var express          = require('express'),
    app              = express(),
    path             = require('path'),
    favicon          = require('static-favicon'),
    logger           = require('morgan'),
    cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'),
    session          = require('express-session'),
    load             = require('express-load'),
    mongoose         = require('mongoose'),
    flash            = require('express-flash'),
    moment           = require('moment'),
    expressValidator = require('express-validator'),
    port             = process.env.PORT || 5000,
    http             = require('http').Server(app),
    io               = require('socket.io')(http);

//conexao com o mongodb
//mongodb://localhost/contatos
//mongodb://alexandre:mo586358@ds159767.mlab.com:59767/contatos
mongoose.connect('mongodb://alexandre:mo586358@ds159767.mlab.com:59767/contatos', function(err){
  if(err){
    console.log("Erro ao conectar no mongodb: "+err);
  }else{
    console.log("conexao com o mongodb efetuada");
  }
});

//middleware
var erros = require('./middleware/erros');

const KEY = 'chatalex.sid', SECRET = 'chatalex';

var cookie   = express.cookieParser(SECRET),
    store    = new express.session.MemoryStore(),
    sessOpts = {secret: SECRET, key: KEY, store: store},
    session  = express.session(sessOpts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookie);
app.use(session);
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//helpers
app.use(function(req,res,next){
  res.locals.moment   = moment;
  res.locals.session  = req.session.usuario;
  res.locals.isLogged = req.session.usuario ? true : false;
  next();
});

io.set('authorization', function(data, accept){
  cookie(data, {},function(err){
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session){
      if(err || !session){
        accept(null, false);
      }else{
        data.session = session;
        accept(null, true);
      }
    });
  });
});

load('models').then('controllers').then('routes').into(app);
load('sockets').into(io);

//middleware
app.use(erros.notfound);
app.use(erros.serverError);



http.listen(port, function() {
    console.log('Express server listening on port: '+port);
});
