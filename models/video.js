const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const schema = new Schema({
  title   : String,
  videoid : String,
  course  : { type: Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Video', schema);
