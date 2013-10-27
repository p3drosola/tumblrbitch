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
      "streams" : [
        {
          "name" : "Reading",
          "blogs" : [
            "jkottke"
          ],
          "slug" : "-reading"
        },
        {
          "name" : "Photography",
          "blogs" : [
            "sangredeltoro",
            "crazyaboutass",
            "muntsaclusellas"
          ],
          "slug" : "-photography"
        },
        {
          "name" : "Design",
          "blogs" : [
            "mrdiv",
            "howimadethis",
            "wedieforbeauty",
            "futuristicretrofuturism"
          ],
          "slug" : "-design"
        },
        {
          "name" : "Funny",
          "blogs" : [
            "oatmeal",
            "fuckyeahragetoons",
            "whenyouliveinbarcelona",
            "shitmystudentswrite"
          ],
          "slug" : "-funny"
        },
        {
          "name" : "Mens Fashion",
          "blogs" : [
            "digital-wardrobe",
            "fuckyeahfashionguys",
            "yourstyle-men",
            "textbookgorgeous",
            "styleguy",
            "his-vogue-style"
          ],
          "slug" : "-mens-fashion"
        }
      ],
      "tumblr_token" : "vFumH1nouAxoYdgKxWJIybSQ8JpwJOvaDWFA3DgH80MHcRjR1c",
      "tumblr_token_secret" : "oCVoTkOpmYeRFWf685lZTFb4pkoKcxwNp5u5inTHEaU4zQdLce",
      "username" : "p3d",
      "created_at": Math.round(new Date().getTime() / 1000)
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
