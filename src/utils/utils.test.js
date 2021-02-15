import filterData from "./filterData.js";
import sortData from "./sortData.js";

describe("test filterData", () => {
  test("test that an array of objects containing the name property actually gets filtered by their names", () => {
    const testResult = filterData(
      [
        { name: "potato bar", address: "address 1" },
        { name: "Burgers n beers", address: "address 2" },
        { name: "Burgerino bars", address: "address 3" },
      ],
      { name: "bar" }
    );

    expect(testResult).toEqual([
      { name: "potato bar", address: "address 1" },
      { name: "Burgerino bars", address: "address 3" },
    ]);
  });

  test("test that an array of objects containing the address property actually gets filtered by their addresses", () => {
    const testResult = filterData(
      [
        { name: "potato bar", address: "address 1" },
        { name: "Burgers n beers", address: "address 2" },
        { name: "Burgerino bars", address: "address 3" },
      ],
      { address: "3" }
    );

    expect(testResult).toEqual([
      { name: "Burgerino bars", address: "address 3" },
    ]);
  });

  test("test that filtering on two different properties work (both price_level and name property)", () => {
    const testResult = filterData(
      [
        { name: "potato bar", price_level: 4 },
        { name: "Burgers n beers", price_level: 5 },
        { name: "Burgerino bars", price_level: 5 },
      ],
      { name: "bar", price_level: 5 }
    );

    expect(testResult).toEqual([{ name: "Burgerino bars", price_level: 5 }]);
  });

  test("test that choices containing properties not in objects in data returns an untouched list", () => {
    const testResult = filterData(
      [
        { name: "potato bar", address: "address 1" },
        { name: "Burgers n beers", address: "address 2" },
        { name: "Burgerino bars", address: "address 3" },
      ],
      { phone_number: "111222333", website: "www.website.com" }
    );

    expect(testResult).toEqual([
      { name: "potato bar", address: "address 1" },
      { name: "Burgers n beers", address: "address 2" },
      { name: "Burgerino bars", address: "address 3" },
    ]);
  });

  test("test that an empty choices object returns an untouched list", () => {
    const testResult = filterData(
      [
        { name: "potato bar", address: "address 1" },
        { name: "Burgers n beers", address: "address 2" },
        { name: "Burgerino bars", address: "address 3" },
      ],
      {}
    );

    expect(testResult).toEqual([
      { name: "potato bar", address: "address 1" },
      { name: "Burgers n beers", address: "address 2" },
      { name: "Burgerino bars", address: "address 3" },
    ]);
  });

  test("test that an empty data lists returns an empty list", () => {
    const testResult = filterData([], { name: "hej" });

    expect(testResult).toEqual([]);
  });
});

describe("test sortData", () => {
  test("sort on name property of data", () => {
    const testResult = sortData(
      [
        { name: "potato bar", address: "address 1" },
        { name: "Burgers n beers", address: "address 2" },
        { name: "Burgerino bars", address: "address 3" },
      ],
      "name"
    );

    expect(testResult).toEqual([
      { name: "Burgerino bars", address: "address 3" },
      { name: "Burgers n beers", address: "address 2" },
      { name: "potato bar", address: "address 1" },
    ]);
  });

  test("sort on address property of data will not change anything since sortData does not support it", () => {
    const testResult = sortData(
      [
        { name: "potato bar", address: "address b" },
        { name: "Burgers n beers", address: "address d" },
        { name: "Burgerino bars", address: "address a" },
      ],
      "address"
    );

    expect(testResult).toEqual([
      { name: "potato bar", address: "address b" },
      { name: "Burgers n beers", address: "address d" },
      { name: "Burgerino bars", address: "address a" },
    ]);
  });

  test("sort on rating property of data", () => {
    const testResult = sortData(
      [
        { name: "potato bar", rating: 4 },
        { name: "Burgers n beers", rating: 2 },
        { name: "Burgerino bars", rating: 5 },
      ],
      "rating"
    );

    expect(testResult).toEqual([
      { name: "Burgers n beers", rating: 2 },
      { name: "potato bar", rating: 4 },
      { name: "Burgerino bars", rating: 5 },
    ]);
  });

  test("sort on price_level property of data", () => {
    const testResult = sortData(
      [
        { name: "potato bar", price_level: 4 },
        { name: "Burgers n beers", price_level: 2 },
        { name: "Burgerino bars", price_level: 5 },
      ],
      "price_level"
    );

    expect(testResult).toEqual([
      { name: "Burgers n beers", price_level: 2 },
      { name: "potato bar", price_level: 4 },
      { name: "Burgerino bars", price_level: 5 },
    ]);
  });
});
