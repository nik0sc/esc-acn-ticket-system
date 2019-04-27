var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');


var app = express();
var debug = require('debug')('back-end:server');
var http = require('http');


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


var server = http.createServer(app);
server.listen(process.env.PORT || 3002);
server.on('listening', onListening);


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);




module.exports = app;
