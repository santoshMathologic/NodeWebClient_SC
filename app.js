var express         = require('express');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var path            = require('path');
var cons            = require('consolidate');
var favicon         = require('serve-favicon');
var routes          = require('./routes/index');
var db              = require('./database/db');
var app             = express();






app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname + 'public')));


app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());
app.use('/', routes);

var raw_port = process.env.PORT;
process.argv.forEach(function (val, index, array) {
  var port_i = val.search(/^port=/i);
  if (port_i > -1) {
    raw_port = val.substring(port_i + 5, val.length);
    console.log("raw_port : " + raw_port);
  }
});

var port = normalizePort(raw_port || '3000');
app.set('port', port);


var server = app.listen(port, function () {
  console.log('Server listening on url: http://localhost:' + port);
});

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Cookie');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;