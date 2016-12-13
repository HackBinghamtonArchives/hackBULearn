const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const schema = new Schema({
  title       : String,
  description : String,
  thumbnail   : String,
  videos      : [{ type: Schema.Types.ObjectId, ref: 'Video' }]
});

module.exports = mongoose.model('Course', schema);
