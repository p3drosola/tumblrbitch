module.exports = [
	['get', '/', 'streams.index'],
  ['get', '/organize', 'streams.organize'],
	['get', '/streams/:slug', 'streams.show']
];