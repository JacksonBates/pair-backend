var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  postTime: Number,
  username: String,
  endTime: Number,
  setup: Schema.Types.Mixed,
  interests: String
})

module.exports = mongoose.model('Post', PostSchema);
