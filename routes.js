var router = require( 'express' ).Router();

router.get( '/', ( req, res ) => {
  res.send( 'Route active' );
})

module.exports = router;