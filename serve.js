const express = require('express');
const request = require('request');
var path = require('path');

var app = express();

var indexpath = path.join(__dirname + '/static/index.html');

if (process.argv.length === 3 && process.argv[2] === 'develop') {
  app.use('/app/uploader/static/', express.static('static', {maxAge: 1}));
  app.use('/app/uploader/common/', express.static('node_modules/re-common-app', {maxAge: 1}));
  app.post('/app/uploader/send-files', function(req, res) {
    var url = host + '/app/upload/file';
    req.pipe(request(url)).pipe(res);
  });
  app.get('/app/uploader/', function (request, response) {
    response.sendFile(indexpath);
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
  app.use('/app/uploader/static/', express.static('static', staticConf));
  app.use('/app/uploader/common/', express.static('node_modules/re-common-app', staticConf));
  app.post('/app/uploader/send-files', function(uploadRequest, uploadResponse) {
    let headers = Object.assign({}, uploadRequest.headers, {'context': '{"domain":"uploader","chain":"files"}'});
    let forwardRequest = request({ url: 'http://process:8080/file-upload', headers: headers });
    uploadRequest.pipe(forwardRequest).pipe(uploadResponse);
  });
  app.get('/app/uploader/', function (request, response) {
    response.sendFile(indexpath);
  });
}

app.listen(8080);
