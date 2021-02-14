/**
 * Will filter the list of restaurants in data depending on the given properties in choices
 * @param {[object]} data
 * @param {object} choices contains properties on which to filter on
 * @param {string} choices.name filter based on name
 */
const filterData = (data, choices) => {
  let result = [...data];
  if (choices.name) {
    result = result.filter((item) => {
      return item.name.toLowerCase().includes(choices.name.toLowerCase());
    });
  }
  return result;
};

export default filterData;
