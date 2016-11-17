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
    
    app.use( '/api/v1', require( './routes' ));
  }

  app.set( 'port', ( process.env.PORT || 5000 ));
  
  app.listen( app.get( 'port' ), function() {
    console.log( 'Node app is running on port ', app.get( 'port' ) );
  });
});