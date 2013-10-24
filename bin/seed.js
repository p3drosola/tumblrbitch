var seed,
_ = require('underscore');

seed = {
  onConnection: function (db) {
    this.db = db;
    this.clear();
  },
  clear: function () {
    this.db.collection('users').remove({}, this.onClear);
  },
  onClear: function (err) {
    if (err) throw err;
    this.insertUser();
  },
  insertUser: function () {
    this.db.collection('users').insert({
      username: 'bob',
      // tumblr_token: 'pu3NDDAaLJtR1EBGG08wkduU2MQDpxiX0PBYm3zrO4VSX51yCw',
      // tumblr_token_secret: 'G17ejZX2wZmNuiGj4rKJHqYo8nQkfSb369paXywE9pD4mHfWvr',
      name: 'Henry Miller',
      streams: [
        {
          slug: 'mens-fashion',
          name: 'Mens Fashion',
          blogs: ['yourstyle-men', 'his-vogue-style', 'styleguy', 'fuckyeahfashionguys']
        },
        {
          slug: 'design',
          name: 'Design',
          blogs: ['wedieforbeauty', 'nothingtochance', 'expensivelife', 'neako']
        },
        {
          slug: 'fotography',
          name: 'Photography',
          blogs: ['roaring-salad-days', 'useabuse', 'textbookgorgeous', 'sangredeltoro']
        }
      ]
    }, this.onInsertUser);
  },
  onInsertUser: function (err, user) {
    if (err) throw err;
    this.db.close();

    console.log(JSON.stringify(user, null, 2));
    console.log('database seeded successfully.');
  }
};

_.bindAll(seed, 'onConnection', 'clear', 'onClear', 'insertUser', 'onInsertUser');
require('../src/initializers/db.js')(null, seed.onConnection);
