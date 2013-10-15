var mongoose = require('mongoose'),
    Category;

Category = mongoose.Schema({
  name: String,
  blogs: [String]
});

module.exports = mongoose.model('Category', Category);
