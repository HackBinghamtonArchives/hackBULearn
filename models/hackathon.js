const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const schema = new Schema({
  name : String,
  location : {
    facility      : String,
    university    : String,
    streetAddress : String,
    city          : String,
    state         : String,
    zipCode       : String,
    country       : String
  },
  dates : {
    start : Date,
    end   : Date
  },
  bannerImage : String,
  websiteURL : String,
  registrationURL : String,
  capacity : Number,
  users : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Hackathon', schema);
