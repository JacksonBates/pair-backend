var mongodb = require( 'mongodb' );
var ObjectId = require( 'mongodb' ).ObjectID;
var convertToMS = require( './convertToMS' );


module.exports = {

  // POST /add

  postAdd: (req, res) => {
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
    res.redirect( 'http://pairboard.surge.sh' );
  },

  // GET /posts

  getPosts: ( req, res ) => {
    var db = req.db;
    var posts = db.collection( 'posts' );
    var now = new Date().getTime();
    posts.find({ endTime: { $gt: now }}).toArray( ( err, posts ) => {
      if (err) {
        console.error( err );
      } else {
        res.json( posts );
      }
    })
  },

  // POST /:id

  deletePost: (req, res) => {
    var db = req.db;
    var id = new ObjectId(req.params.id);
    var posts = db.collection( 'posts' );
    try {
      posts.deleteOne({ '_id': id });
      console.log('Attempting to delete', id)
    } catch( err ) {
      console.log( err );
    }
    res.redirect( 'http://pairboard.surge.sh' );
  }

}