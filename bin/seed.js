var mongoose = require('mongoose'),
    async = require('async'),
    User = require('../src/models/user.js'),
    Category = require('../src/models/category.js'),
    categories,
    users,
    db;

mongoose.connect('mongodb://localhost/tumblrbitch');
db = mongoose.connection;

db.on('error', function (error) {
  console.error('db connection error:', error);
  process.exit();
});

db.collections.users.drop();
db.collections.categories.drop();

categories = [
  {
    name: 'Mens Fashion',
    blogs: ['digital-wardrobe', 'yourstyle-men', 'his-vogue-style', 'styleguy']
  },
  {
    name: 'design',
    blogs: ['wedieforbeauty', 'sangredeltoro']
  }
];

async.map(categories, function (data, callback) {
  new Category().save(callback);
}, function (err, categories) {
  console.log('categories created...');
  new User({
    id: 1,
    name: 'Bob',
    categories: categories
  }).save(function (err) {
    console.log('done!');
    db.close();
  });
});
