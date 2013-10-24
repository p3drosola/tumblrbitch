module.exports = function (server) {

  var _, _s, fs, controllers = {}, middlewares = {};

  _ = require('underscore');
  _s = require('underscore.string');
  fs = require('fs');

	// initializers
  // TODO meta program this stuff
  function loadInitializer(name) {
    console.log('loaded initializer:', name);
    require(__dirname + '/initializers/' + name)(server);
  }

  function loadMiddleware(filename) {
    var name = _s.camelize(filename.replace(/\.js$/, ''));
    console.log('loaded middleware: ', name);
    middlewares[name] = require(__dirname + '/middleware/' + filename)(server);
  }

  function loadController(filename) {
    var name = filename.replace(/\.js$/, '');
    console.log('loaded controller: ', name);
    controllers[name] = require(__dirname + '/controllers/' + filename)(server);
  }

  fs.readdirSync(__dirname + '/initializers').forEach(loadInitializer);
  fs.readdirSync(__dirname + '/middleware'  ).forEach(loadMiddleware);
  server.set('middleware', middlewares);
  fs.readdirSync(__dirname + '/controllers' ).forEach(loadController);


  // map routes to controllers
  console.log('\n>> Routes');
  _.each(require('./routes.js'), function (row) {

    var method = row[0] ,
    url = row[1],
    controller_name = row[2].split('.')[0],
    action_name = row[2].split('.')[1],
    actions = controllers[controller_name][action_name];

    if (!_.isArray(actions)) {
      actions = [actions];
    }
    console.log(method, ':', url, '->', actions);
    
    // convert middleware names to functions
    actions = _.map(actions, function (action) {
      if (_.isString(action)) {
        return middlewares[action];
      }
      return action;
    })

    server[method](url, actions);
  });
};