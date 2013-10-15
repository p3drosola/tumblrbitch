var mongoose = require('mongoose'),
    Category = require('./category.js'),
    User;

User = mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  token: String,
  token_secret: String,
  categories: [Category.schema]
});

module.exports = mongoose.model('User', User);
