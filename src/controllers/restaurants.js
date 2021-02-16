import models from "../models";
import connectToDatabase from "../db";
import sortData from "../utils/sortData";
import filterData from "../utils/filterData";
import _ from "lodash";

/* used to check that a connection to the database has been made before querying it */
let db;

/**
 * Handles the GET request to fetch all the restaurants
 * @param {object} queries contains the queried key-value pairs if applied by the client
 * @returns an object containing information to send back to the client,
 *          error property that is false if no error produced else true
 *          if error is false a data property containing data to be sent back
 *          if error is true a message property defining the error
 *          statusCode property containing some appropriate status code depending on the outcome of the request
 */
const getAllRestaurants = async (queries) => {
  try {
    if (!db) db = await connectToDatabase();
    const restaurants = await models.Restaurant.find({});
    let data = restaurants.map((restaurant) =>
      _.pick(restaurant, [
        "id",
        "name",
        "price_level",
        "rating",
        "location",
        "photo",
      ])
    );

    /* sort (in ascending order) by either name, price_level or rating  */
    const sortableValues = ["name", "price_level", "rating"];
    if (queries.sortBy && sortableValues.includes(queries.sortBy)) {
      data = sortData(data, queries.sortBy);
    }

    /* only allow filtering on name atm */
    let filters = {};
    if (queries.name) {
      filters["name"] = queries.name;
      data = filterData(data, filters);
    }
    return {
      error: false,
      statusCode: 200,
      data,
    };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: "Couldn't fetch all restaurants from database.",
    };
  }
};

/**
 * Handles the GET request to fetch a specific restaurant
 * @param {integer} id the id of the restaurant
 * @returns an object containing information to send back to the client,
 *          error property that is false if no error produced else true
 *          if error is false a data property containing data to be sent back
 *          if error is true a message property defining the error
 *          statusCode property containing some appropriate status code depending on the outcome of the request
 */
const getSpecificRestaurant = async (id) => {
  try {
    if (!db) db = await connectToDatabase();
    const restaurant = await models.Restaurant.findOne({ id });
    if (!restaurant) {
      return {
        error: true,
        statusCode: 404,
        message: `Restaurant with id ${id} was not found!`,
      };
    }
    return { error: false, statusCode: 200, data: restaurant };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: error.toString(),
    };
  }
};

/**
 * Handles the POST request to create a new restaurant
 * @param {object} content the contents of the restaurant to be created
 * @returns an object containing information to send back to the client,
 *          error property that is false if no error produced else true
 *          if error is false a data property containing data to be sent back
 *          if error is true a message property defining the error
 *          statusCode property containing some appropriate status code depending on the outcome of the request
 */
const createRestaurant = async (content) => {
  try {
    if (!db) db = await connectToDatabase();
    const restaurant = await models.Restaurant.create({
      id: content.id,
      name: content.name,
      opening_hours: content.opening_hours,
      address: content.address,
      phone_number: content.phone_number,
      location: content.location,
      icon: content.icon,
      price_level: content.price_level,
      rating: content.rating,
      google_maps_url: content.google_maps_url,
      website: content.website,
      photo: content.photo,
    });
    return { error: false, statusCode: 201, data: restaurant };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: error.toString(),
    };
  }
};

/**
 * Handles the DELETE request to delete a specific restaurant
 * @param {integer} id the id of the restaurant
 * @returns an object containing information to send back to the client,
 *          error property that is false if no error produced else true
 *          if error is false a data property containing data to be sent back
 *          if error is true a message property defining the error
 *          statusCode property containing some appropriate status code depending on the outcome of the request
 */
const deleteRestaurant = async (id) => {
  try {
    if (!db) db = await connectToDatabase();
    const restaurant = await models.Restaurant.findOne({ id }).exec();
    if (!restaurant) {
      return {
        error: true,
        statusCode: 404,
        message: `Restaurant with id ${id} not found!`,
      };
    }
    const result = await restaurant.remove();
    return { error: false, statusCode: 204, data: result };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: error.toString(),
    };
  }
};

/**
 * Handles the PUT request to update a specific restaurant
 * @param {integer} id the id of the restaurant
 * @param {object} content the contents of the specific restaurant that is to be updated
 * @returns an object containing information to send back to the client,
 *          error property that is false if no error produced else true
 *          if error is false a data property containing data to be sent back
 *          if error is true a message property defining the error
 *          statusCode property containing some appropriate status code depending on the outcome of the request
 */
const updateRestaurant = async (id, content) => {
  try {
    if (!db) db = await connectToDatabase();

    const restaurant = await models.Restaurant.findOne({ id });
    if (!restaurant) {
      return {
        error: true,
        statusCode: 404,
        message: `Restaurant with id ${id} not found!`,
      };
    }
    /* 
        FIXME mongodb strictly follows the schema implementation by default so we won't add fields that the user provided that is not part of the Restaurant schema.
        Is this alright ..or should we validate that each property in content is ok and throw error otherwise?
    */
    const result = await restaurant.update(content, { new: true });
    return {
      error: false,
      statusCode: 202,
      data: `Restaurant with id: ${id} was successfully updated!`,
    };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: error.toString(),
    };
  }
};

export default {
  getAllRestaurants,
  getSpecificRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createRestaurant,
};
