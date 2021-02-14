import mongoose from "mongoose";

/* 
  Properties taken from the provision folder
  However added required attributes on some properties
*/
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, index: true, unique: true },
  opening_hours: { type: [String], required: true },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  location: { lat: Number, lng: Number },
  icon: String,
  price_level: Number,
  rating: Number,
  google_maps_url: String,
  website: String,
  photo: String,
});

const Restaurant = mongoose.model("restaurants", restaurantSchema);

export default Restaurant;
