var mongoose = require('mongoose'),
    User = require('../src/models/user.js'),
    Category = require('../src/models/category.js'),
    db;

mongoose.connect('mongodb://localhost/tumblrbitch');
db = mongoose.connection;

db.on('error', function (error) {
  console.error('db connection error:', error);
  process.exit();
});

db.collections.users.drop();
db.collections.categories.drop();

new Category({
  name: 'Mens Fashion',
  blogs: ['digital-wardrobe', 'yourstyle-men', 'his-vogue-style', 'styleguy']
}).save();

new Category({
  name: 'design',
  blogs: ['wedieforbeauty', 'sangredeltoro']
}).save();


Category.find({}, function (err, categories) {
  new User({
    id: 1,
    name: 'Bob',
    categories: categories
  }).save(function (err) {
    console.log('done!');
    db.close();
  });
});

