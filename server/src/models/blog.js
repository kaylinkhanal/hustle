const mongoose = require('mongoose')
const { Schema } = mongoose;

const parcelSchema = new Schema({
  parcelItem: String, 
  parcelWeight: Number, 
  parcelPickUp: String, 
  parcelDestination: String, 
  parcelCharge: Number,
  parcelStatus: {
      type: String,
      enum : ['Pending','Approved','Delivered','delayed','cancelled'],
      default: 'Pending'
  },

});


const Parcel = mongoose.model('Parcel', parcelSchema);
module.exports = Parcel