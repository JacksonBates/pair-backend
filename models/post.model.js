var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  postTime: { type: Number, required: true },
  username: { type: String, required: true },
  endTime: { type: Number, required: true },
  setup: Schema.Types.Mixed,
  interests: String
})

module.exports = mongoose.model('Post', PostSchema);
