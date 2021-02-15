/**
 * Will filter the list of objects in data depending on the given properties in choices
 * @param {[object]} data list of objects atleast containing the possible properties in choices
 * @param {object} choices contains properties on which to filter on
 * @preCondition make sure that the properties of choices are valid properties of the objects in data.
 *               Will only work on single depth properties i.e no nestled properties etc.
 * @returns A list of objects that has matched with the choices properties
 */
const filterData = (data, choices) => {
  let result = [...data];

  result = result.filter((item) => {
    return filterHelper(item, choices);
  });
  return result;
};

const filterHelper = (item, choices) => {
  let pass = true;
  for (const key in choices) {
    if (item.hasOwnProperty(key)) {
      if (typeof item[key] === "string")
        pass = item[key].toLowerCase().includes(choices[key].toLowerCase());
      else {
        pass = item[key] === choices[key];
      }
    }
    if (pass === false) {
      break;
    }
  }
  return pass;
};
export default filterData;
