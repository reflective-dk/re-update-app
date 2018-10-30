const express = require('express');
const request = require('request');
var Client = require('re-client');
var path = require('path');
var serve_utils = require('re-common-app');
const cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());


var indexpath = path.join(__dirname + '/static/index.html');
if (process.argv.length === 3 && process.argv[2] === 'develop') {

  app.use('/app/upload/static/', express.static('static', {maxAge: 1}));
  app.use('/app/upload/common/', express.static('node_modules/re-common-app', {maxAge: 1}));

  var host = 'https://test.reflective.dk';
  var client = new Client({ host: host });
  var credentials = {
    username: 'demo@reflective.dk',
    password: 'cyqladwys',
    context: {"domain": "base"} // only for user cred. uploads go to ipfs
  };
  app.get('/app/upload/', serve_utils.test_token(client, credentials, indexpath));
  app.use('/', function(req, res) {
    var url = host + req.url;
    req.pipe(request(url)).pipe(res);
  });

} else {
  var staticConf = {maxAge: 360000 * 1000};
  app.use('/app/upload/static/', express.static('static', staticConf));
  app.use('/app/upload/common/', express.static('node_modules/re-common-app', staticConf));

  app.get('/app/upload/', serve_utils.ensure_login(indexpath));
}

app.listen(8080);
