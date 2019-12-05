const express = require('express');
const request = require('request');
var path = require('path');

var app = express();

var indexpath = path.join(__dirname + '/static/index.html');
if (process.argv.length === 3 && process.argv[2] === 'develop') {
  app.use('/app/upload/static/', express.static('static', {maxAge: 1}));
  app.use('/app/upload/common/', express.static('node_modules/re-common-app', {maxAge: 1}));
  
  app.get('/app/upload/', function (request, response) {
    response.sendFile(indexpath);
  });
  
  app.post('/file-upload',function (uploadRequest, uploadResponse) {
    let headers = Object.assign({}, uploadRequest.headers, {'context': '{"domain":"uploader","chain":"files"}'});
    let forwardRequest = request({ url: 'http://process:8080/file-upload', headers: headers });
    uploadRequest.pipe(forwardRequest).pipe(uploadResponse);
  });
  var host = 'https://test.reflective.dk';
  app.use('/', function(req, res) {
    var url = host + req.url;
    req.pipe(request(url)).pipe(res);
  });
} else {
  var staticConf = {
    maxAge: 360000 * 1000
  };
  app.use('/app/upload/static/', express.static('static', staticConf));
  app.use('/app/upload/common/', express.static('node_modules/re-common-app', staticConf));
  
  app.get('/app/upload/', function (request, response) {
    response.sendFile(indexpath);
  });
}

app.listen(8080);
