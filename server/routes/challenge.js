
var CouchService = require('../service/couchService');
var couchService = new CouchService('challenges');
var moment = require('moment');

module.exports = function(app){

  app.post('/popcorn/createChallenge', function( req, res, next ){

    var challenge = {
      created_by: req.session.username,
      created_date: moment(),
      name: req.body.name,
      desc:req.body.desc
    };

    couchService.insert( challenge, 0 ).then( function( d ){
      console.log("challenge created: " + d);
      res.send( 200, d );
    })
    .fail(function( err ){
      console.log( err );
      res.send( err.statusCode, err );
    });
  });

  app.get('/popcorn/getChallenge', function( req, res, next ){
    couchService.getView('views','getChallengesByDate').then(function( data ){
      res.send(200, data);
    })
    .catch(function(err){
      res.send(500, err);
    });
  });

  app.get('/popcorn/getChallenges', function( req, res, next ){
    couchService.get().then(function( data ){
      res.send(200, data);
    })
      .catch(function(err){
        res.send(500, err);
      });
  });

}