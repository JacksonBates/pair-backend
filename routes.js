var router = require( 'express' ).Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get( '/', ( req, res ) => {
  res.send( 'Route active' );
})

router.post( '/add', urlencodedParser, (req, res) => {
  var username = req.body.username;
  var availableTime = req.body.availableTime;
  var setup = req.body.setup;
  var interests = req.body.interests;
  console.log('Received: ', username, availableTime, setup, interests);
  var db = req.db;
  var posts = db.collection( 'posts' );
  posts.insert({
    username: username,
    availableTime: availableTime,
    setup: setup,
    interests: interests
  });
  res.sendStatus(200);
  // var db = req.db;
  // var collection = db.collection( 'posts' );
  // collection.insert({})
})

module.exports = router;