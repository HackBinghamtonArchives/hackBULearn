const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const schema = new Schema({
  title   : { type: String, required: true },
  videoid : { type: String, required: true },
  course  : { type: Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Video', schema);
