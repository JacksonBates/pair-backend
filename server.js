require( './config/config.js' );

var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' );
io = io.listen( server );
var mongoose = require( 'mongoose' );
var mongodb = require( 'mongodb' );
var mongo = mongodb.MongoClient;

var Post = require( './models/post.model' );

var url = process.env.MONGODB_URI;

mongoose.connect( url );

var db = mongoose.connection;
db.on( 'error', console.error.bind( console, 'connection error:' ));
if ( !process.env.NODE_ENV === 'test' ) {
  db.once( 'open', function() {
    console.log( 'DB Connected' );
  })
};

// Disable x-powered-by header which shows what software server is running (express);
app.disable('x-powered-by');

// Add headers
// Source: http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use(function (req, res, next) {

  // Currently allows access from any origin
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

// Middleware for routes
app.use( '/api/v1', require( './routes' ));

app.set( 'port', ( process.env.PORT || 3001 ));
server.listen( app.get( 'port' ), function() {
  if ( !process.env.NODE_ENV === 'test') {
    console.log( 'Node app is running on port ', app.get( 'port' ) );
  }
});

io.sockets.on( 'connection', socket => {
    console.log( 'client connected', socket.id );
    socket.on( 'post', data => {
      socket.broadcast.emit( 'post', { post: data });
    });
    socket.on( 'delete', data => {
      console.log( 'deleting: ', data);
      socket.broadcast.emit( 'delete', { delete: data });
    });
    // We're connected to someone now. Let's listen for events from them
    // socket.on('some event', function(data) {
    //     // We've received some data. Let's just log it
    //     console.log(data);
    //     // Now let's reply
    //     socket.emit('event', {some: "data"});
    // });
});

module.exports = app;
