var express = require( 'express' );
var app = express();
var mongodb = require( 'mongodb' );
var mongo = mongodb.MongoClient;

var mongoUserPsw = process.env.MONGO_USR_PSW;
var url = 'mongodb://' + mongoUserPsw + '@ds155737.mlab.com:55737/pair-with-me';

mongo.connect( url, function( err, db ) {
  if ( err ) {
    console.log( 'Error: Could not connect to DB' );
  } else {
    console.log( 'Success: Connected to DB' );
    
    app.use( function( req, res, next) {
      req.db = db;
      next();
    });
    
    // Source: http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
    // Add headers
    app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
    });

    app.use( '/api/v1', require( './routes' ));
  }

  app.set( 'port', ( process.env.PORT || 5000 ));
  
  app.listen( app.get( 'port' ), function() {
    console.log( 'Node app is running on port ', app.get( 'port' ) );
  });
});