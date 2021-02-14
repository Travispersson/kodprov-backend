import express from "express";
import controller from "../controllers";

const router = express.Router();

const restaurantController = controller.restaurantController;

router.get("/", async (req, res) => {
  const queries = req.query;
  const result = await restaurantController.getAllRestaurants(queries);
  if (result.error) {
    return res.status(result.statusCode).send(result.message);
  } else {
    return res.status(result.statusCode).send(result.data);
  }
});

router.get("/:restaurantId", async (req, res) => {
  const id = req.params.restaurantId;
  const result = await restaurantController.getSpecificRestaurant(id);
  if (result.error) {
    return res.status(result.statusCode).send(result.message);
  } else {
    return res.status(result.statusCode).send(result.data);
  }
});

router.post("/", async (req, res) => {
  const content = req.body;
  const result = await restaurantController.createRestaurant(content);
  if (result.error) {
    return res.status(result.statusCode).send(result.message);
  } else {
    return res.status(result.statusCode).send(result.data);
  }
});

router.put("/:restaurantId", async (req, res) => {
  const content = req.body;
  const id = req.params.restaurantId;
  const result = await restaurantController.updateRestaurant(id, content);
  if (result.error) {
    return res.status(result.statusCode).send(result.message);
  } else {
    return res.status(result.statusCode).send(result.data);
  }
});

router.delete("/:restaurantId", async (req, res) => {
  const id = req.params.restaurantId;
  const result = await restaurantController.deleteRestaurant(id);
  if (result.error) {
    return res.status(result.statusCode).send(result.message);
  } else {
    return res.status(result.statusCode).send(result.data);
  }
});

export default router;
