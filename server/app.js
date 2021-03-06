var config          = require('config');
var fs              = require('fs');
var http            = require('http');
var express         = require('express');
var session         = require('express-session');
var bodyParser      = require('body-parser');
//var connect         = require('connect');
var ConnectCouchDB  = require('connect-couchdb')(session);
//var Cookies         = require( "cookies" );
var _               = require('lodash');

var app             = express();
var server          = http.createServer( app );

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended: true }) );

// parse application/json
app.use( bodyParser.json() );


var store = new ConnectCouchDB({
  //Name of Database for session storage
  name: 'sessions',
  //How often  expired sessions should be cleaned up
  host:config.couch.url,
  reapInterval: config.session.reapInterval,
  compactInterval:config.session.compactInterval,
  setThrottle: config.session.throttle
});

/**
 * allowCrossDomain
 * @param req
 * @param res
 * @param next
 */
var allowCrossDomain = function( req, res, next ){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use( session({
  secret:'popcorn is good',
  store:store,
  cookie:{maxAge:config.session.cookie.maxAge}
}));

app.use( express.static('src') );
app.use( allowCrossDomain );

app.options('/*', function(req, res){
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  res.send(200);
});

//-- require all routes in playground directory to run security check
app.all("/popcorn/*", securityCheck, function(req, res, next){
  next();
});

// Load all other routes
fs.readdirSync( __dirname + '/routes' ).forEach( function( file ) {
  require( './routes/' + file )( app );
});

app.use(express.static('client'));

var port = process.env.PORT || 8081;
var env = process.env.NODE_ENV || 'default';
server.listen(port, function() {
  console.log('PORT: ', port, ' ENV: ', env);
});



//---functions------
/**
 * securityCheck
 * @param req
 * @param res
 * @param next
 */
function securityCheck(req, res, next) {
  store.get(req.session.id, function (err, session) {
    if (err) {
      res.send(500, {message: err});
    }
    if (session) {
      if (_.has(session, 'username')) {
        if (session.username == req.session.username) {
          next();
        }
      } else {
        console.log('Forbidden');
        store.destroy( req.session.id, function( err ){
          if(err)
            console.log("error: " + err );
          else
            console.log( "Session Destroyed" );
        } );
        res.send(403, {message: 'Forbidden'});
      }
    }
    else {
      console.log('Forbidden');
      store.destroy( req.session.id, function( err ){
        if(err)
          console.log("error: " + err );
        else
          console.log( "Session Destroyed" );
      } );
      res.send(403, {message: 'Forbidden'});
    }
  });
}
