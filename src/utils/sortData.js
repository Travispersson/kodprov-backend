/**
 *  Comparisons result in a sorted array in ascending order.
 */

const compareName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const comparePriceLevel = (a, b) => {
  if (a.hasOwnProperty("price_level") && b.hasOwnProperty("price_level")) {
    return a.price_level - b.price_level;
  }

  /* order => missing price_level property objects will come last in sorted list */
  if (!a.hasOwnProperty("price_level")) {
    return 1;
  }
  if (!b.hasOwnProperty("price_level")) {
    return -1;
  }
};

const compareRating = (a, b) => {
  return a.rating - b.rating;
};

/**
 * Will sort the list of restaurants in data in ascending order depending on property sortOn
 * @param {[object]} data list of restaurants
 * @param {string} sortOn either name, price_level or rating
 * 
 * TODO maybe make generic..
 */
const sortData = (data, sortOn) => {
  let toBeSorted = [...data];
  if (sortOn === "name") {
    toBeSorted.sort(compareName);
  } else if (sortOn === "price_level") {
    toBeSorted.sort(comparePriceLevel);
  } else if (sortOn === "rating") {
    toBeSorted.sort(compareRating);
  }
  return toBeSorted;
};

export default sortData;
