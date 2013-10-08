'use strict';

var _, db, app, config, express, tumblr, client;

db = {
  blogs: [],
  categories: {
    1: {id: 1, name: 'Mens Fashion'},
    2: {id: 2, name: 'Illustration'},
    3: {id: 3, name: 'Writing'},
    4: {id: 4, name: 'Inspiration'},
    5: {id: 5, name: 'GIFs'}
  }
};

express = require('express');
tumblr = require('tumblr.js');
_ = require('underscore');
require('js-yaml');

// load the yml file
try {
  config = require(__dirname + '/config.yml');
} catch (e) {
  console.error('Missing config.yml check the README');
}

client = new tumblr.Client(config);

// fetch list of blogs user follows
client.following(function (err, data) {
  if (err) return console.log(err);
  console.log(data.blogs);
  db.blogs = data.blogs;


  _.findWhere(db.blogs, {name: 'jesselucas'}).category_id = 2;
  _.findWhere(db.blogs, {name: 'mariocaropreso'}).category_id = 3;

  _.findWhere(db.blogs, {name: 'yourstyle-men'}).category_id = 1;
  _.findWhere(db.blogs, {name: 'his-vogue-style'}).category_id = 1;
  _.findWhere(db.blogs, {name: 'styleguy'}).category_id = 1;
  _.findWhere(db.blogs, {name: 'fuckyeahfashionguys'}).category_id = 1;


});

// configure server
app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.logger());
app.engine('jade', require('jade').__express);


app.get('/', function (req, res) {
  res.render('stream/index.jade', {
    title: 'Stream',
    categories: db.categories,
    blogs: db.blogs
  });
});

app.get('/stream/:id', function (req, res) {
  var category = db.categories[req.params.id],
      category_blogs = _.findWhere(db.blogs, {category_id: category.id});

  _.each(category_blogs, function () {
    // TODO: fetch blog posts
  });

  if (category) {
    res.render('stream/item.jade', {
      title: 'Stream',
      categories: db.categories,
      category: category
    });
  } else {
    res.end('404');
  }
});

app.listen(3000);
