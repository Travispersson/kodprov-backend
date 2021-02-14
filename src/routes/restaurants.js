import express from "express";

const router = express.Router();

// TODO! FIX ERROR HANDLING AND RETURN STATUSES
router.get("/", async (req, res) => {
  try {
    const restaurants = await req.context.models.Restaurant.find({});
    res.send(restaurants);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:restaurantId", async (req, res) => {
  try {
    const id = req.params.restaurantId;
    const restaurant = await req.context.models.Restaurant.findOne({ id });
    res.send(restaurant);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const id = req.params.restaurantId;
    const restaurant = await req.context.models.Restaurant.create({
      id: req.body.id,
      name: req.body.name,
      opening_hours: req.body.opening_hours,
      address: req.body.address,
      phone_number: req.body.phone_number,
      location: req.body.location,
      icon: req.body.icon,
      price_level: req.body.price_level,
      rating: req.body.rating,
      google_maps_url: req.body.google_maps_url,
      website: req.body.website,
      photo: req.body.photo,
    });
    res.send(restaurant);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:restaurantId", async (req, res) => {
  try {
    const id = req.params.restaurantId;
    //assume we only can update website atm
    const updateContent = { website: req.body.website };
    const restaurant = await req.context.models.Restaurant.findByIdAndUpdate(
      id
    );
    res.send(restaurant);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:restaurantId", async (req, res) => {
  try {
    const id = req.params.restaurantId;
    const restaurant = await req.context.models.Restaurant.findOne({ id });
    let result = await restaurant.remove();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

export default router;
