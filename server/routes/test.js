
var _ = require('lodash');

module.exports = function( app ){

  app.get('/popcorn/test', function( req, res, next ){
    console.log("test security works");
    res.send(200, 'test security works');
  });

  app.get('/test', function( req, res, next ){
    console.log("test works");
    res.send(200, 'test works');
  });


};