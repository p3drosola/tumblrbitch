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
      tumblr_id: 1,
      name: 'Henry Miller',
      streams: [
        {
          name: 'Mens Fashion',
          blogs: ['yourstyle-men', 'his-vogue-style', 'styleguy', 'fuckyeahfashionguys']
        },
        {
          name: 'design',
          blogs: ['wedieforbeauty', 'sangredeltoro']
        }
      ]
    }, this.onInsertUser);
  },
  onInsertUser: function (err, user) {
    if (err) throw err;

    console.log(JSON.stringify(user, null, 2));

    console.log('database seeded successfully.');

    this.db.close();
  }

};



_.bindAll(seed, 'onConnection', 'clear', 'onClear', 'insertUser', 'onInsertUser');
require('../src/initializers/db.js')(null, seed.onConnection);
