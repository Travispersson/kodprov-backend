import mongoose from "mongoose";

/* attributes taken from the provision folder */
const restaurantSchema = new mongoose.Schema({
  name: String,
  id: { type: Number, index: true, unique: true },
  opening_hours: [String],
  address: String,
  phone_number: String,
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
