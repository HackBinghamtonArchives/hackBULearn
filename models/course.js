const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

/**
 * Schema Definition
 */
const schema = new Schema({
  title       : { type: String, required: true },
  description : { type: String, required: true },
  thumbnail   : { type: String, required: true },
  videos      : [{ type: Schema.Types.ObjectId, ref: 'Video' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

/**
 * Middleware: Timestamp all mutating transactions
 */
function updateTimestamps(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if(!this.created_at) this.created_at = currentDate;
  return next();
}

schema.pre('create', updateTimestamps);
schema.pre('save', updateTimestamps);
schema.pre('update', updateTimestamps);
schema.pre('findByIdAndUpdate', updateTimestamps);

module.exports = mongoose.model('Course', schema);
