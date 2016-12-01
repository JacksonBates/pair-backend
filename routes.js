var ObjectId = require('mongodb').ObjectID;
var router = require( 'express' ).Router();
var queries = require( './controllers/queries' );
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post( '/add', urlencodedParser, queries.postAdd );

router.get( '/posts', queries.getPosts );

router.post( '/:id', urlencodedParser, queries.deletePost );

module.exports = router;