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
  },

  // POST /posts
  addPost: (req, res) => {
    const {username, availableTime, setup, interests} = req.body;
    if (!username || !availableTime) return res.status(400).send({status: 400, error: "Missing parameters."});
    const endTime = convertToMS(availableTime);

    req.db.collection('posts').insert({
      postTime: new Date().getTime(),
      endTime: new Date().getTime() + endTime,
      username, setup, interests
    }).then(doc => {

      // this is not necessary if mongoose is used
      doc.ops[0].setup = doc.ops[0].setup || null;
      doc.ops[0].interests = doc.ops[0].interests || null;

      res.status(201).send({status: 201, data: doc.ops[0]});
    }).catch(e => res.status(400).send({status: 400, error: "Error."}));
  },

  // DELETE /posts/:id
  deleteOnePost: (req, res) => {
    var id = new ObjectId(req.params.id);
    req.db.collection('posts').deleteOne({'_id': id})
    .then(data => {
      if (!data.deletedCount) return res.status(404).send({error: "Record not found."});
      res.status(204).send();
    })
    .catch(err => {
      return res.status(400).send({error: "Bad request."})
    });
  }
}
