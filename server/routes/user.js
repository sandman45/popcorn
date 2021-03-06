
var CouchService = require('../service/couchService');
var couchService = new CouchService('users');
var crypto = require('crypto-js');

module.exports = function(app){
  app.post('/login', function( req, res, next ){
    if(req.body.email && req.body.email.length>0){
      couchService.get(req.body.email).then(function(data){
        console.log(data);
        if(data.password === crypto.SHA3(req.body.password).toString()){
          //set session
          req.session.username = req.body.email;
          req.session.firstname = data.firstname;
          req.session.lastname = data.lastname;
          req.session.email = data.email;
          res.send(200, "Success");
        }else{
          res.send(401, {message:"Username or Password incorrect"});
        }
      })
      .fail(function(err){
        console.log(err);
          if(err.message === "missing"){
            res.send(err.statusCode, {message:"Username or Password incorrect"});
          }else{
            res.send(err.statusCode, {message:err.message});
          }
      });
    }else{
      res.send(402, {message:"Username or Password incorrect"})
    }
  });

  app.get('/logout', function( req, res, next ){
     req.session.destroy();
     res.send(200, "success");
  });

  app.get('/popcorn/user/:id', function( req, res, next ){
      couchService.get( req.params.id === "refresh" ? req.session.email : req.params.id ).then( function( d ){
        res.send( 200, d );
      })
      .fail(function( err ){
        res.send( err.statusCode, err );
      });
  });
  /**
   * createUser
   * this will create a new document in couch.
   * if the id is already in couch it will update it
   */
  app.post( '/createUser', function( req, res, next ){
    console.log( 'createUser' );
    var doc = {
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: crypto.SHA3(req.body.password).toString(),
      phone: req.body.phone,
      postal: req.body.postal,
      state: req.body.state,
      userid: req.body.userid,
      username: req.body.username
    };

    couchService.insert( doc, req.body.email, 0 ).then( function( d ){
      console.log("user created: " + d);
      res.send( 200, d );
    })
    .fail(function( err ){
        console.log( err );
      res.send( err.statusCode, err );
    });
  });

  app.post( '/popcorn/updateUser', function( req, res, next ){
    console.log( 'updateUser' );
    var updateDoc =  req.body;

    couchService.get(updateDoc._id).then(function(d){
      updateDoc._rev = d._rev;
      couchService.insert(updateDoc, d._id).then(function(returnDoc){
        res.send(200, returnDoc);
      }).fail(function(err){
        console.log(err);
      });
    }).fail(function(err){
      console.log(err);
    });
  });

}