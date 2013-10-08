'use strict';

var app, config, express, Tumblr, user;

express = require('express');
Tumblr = require('tumblr');
require('js-yaml');

try {
  config = require(__dirname + '/config.yml');
} catch (e) {
  console.error('Missing config.yml check the README');
}

user = new Tumblr.User(config);


user.info(function (error, res) {
  if (error) {
    return console.error(error);
  }
  console.log(res.user);
});

app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
