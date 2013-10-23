require('../src/initializers/db.js')(null, function (db) {
  console.log(db, 'db connected');
  debugger;
});
