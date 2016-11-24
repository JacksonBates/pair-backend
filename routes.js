var router = require( 'express' ).Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var convertToMS = require( './convertToMS' );
router.get( '/', ( req, res ) => {
  res.send( 'Route active' );
})

router.post( '/add', urlencodedParser, (req, res) => {
  var username = req.body.username;
  var availableTime = req.body.availableTime;
  var setup = req.body.setup;
  var interests = req.body.interests;
  var endTime = convertToMS(availableTime);
  console.log( 'Received: ', username, availableTime, setup, interests);
  var db = req.db;
  var posts = db.collection( 'posts' );
  posts.insert({
    postTime: new Date().getTime(),
    username: username,
    endTime: new Date().getTime() + endTime,
    setup: setup,
    interests: interests
  });
  res.redirect('http://pairboard.surge.sh');
})

router.get( '/posts', ( req, res ) => {
  var db = req.db;
  var posts = db.collection( 'posts' );
  posts.find({}).toArray( ( err, posts ) => {
    if (err) {
      console.error( err );
    } else {
      res.json( posts );
    }
  })
})

module.exports = router;