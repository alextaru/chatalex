module.exports = function(io){
  io.sockets.on("connection", function(client){
    client.on('send-server',function(data){
      //var msg = "<b>"+data.nome+":</b>"+data.msg+"<br>";
      var horario = "14:35";
      var msg1 = "<div class=\"media-rigth\"></div><div class=\"media-body pad-hor\"><div class=\"speech\"><a href=\"#\" class=\"media-heading\">" + data.nome + "</a><p>" + data.msg + "</p><p class=\"speech-time\"><i class=\"fa fa-clock-o fa-fw\"></i>" + horario + "</p></div></div>";
      var msg2 = "<div class=\"media-left\"></div><div class=\"media-body pad-hor speech-right\"><div class=\"speech\"><a href=\"#\" class=\"media-heading\">" + data.nome + "</a><p>" + data.msg + "</p><p class=\"speech-time\"><i class=\"fa fa-clock-o fa-fw\"></i>" + horario + "</p></div></div>";
      client.emit('send-client',msg2);
      client.broadcast.emit('send-client',msg1);
    });
  });
}
