const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const schema = new Schema({
  name : { type: String, required: true },
  location : {
    facility      : { type: String, required: true },
    university    : { type: String, required: true },
    streetAddress : { type: String, required: true },
    city          : { type: String, required: true },
    state         : { type: String, required: true },
    zipCode       : { type: String, required: true },
    country       : { type: String, required: true }
  },
  dates : {
    start : { type: Date, required: true },
    end   : { type: Date, required: true }
  },
  bannerImage : { type: String, required: true },
  websiteURL : { type: String, required: true },
  registrationURL : { type: String, required: true },
  capacity : { type: Number, required: true },
  users : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Hackathon', schema);
