const Manager = require("../Manager");

const instance = new Manager(
  "Hassan Khan",
  7,
  "Hassankhan@gmail.com",
  257
);

describe("Manager", () => {
  test("should be an Manager", () => {
    const expected = "Manager";
    const actual = instance.getRole();

    expect(actual).toEqual(expected);
  });

  test("should return expected name", () => {
    const expected = "Hassan Khan";
    const actual = instance.getName();

    expect(actual).toEqual(expected);
  });

  test("should return expected Id", () => {
    const expected = 7;
    const actual = instance.getId();

    expect(actual).toEqual(expected);
  });

  test("should return the expected email", () => {
    const expected = "Hassankhan@gmail.com";
    const actual = instance.getEmail();

    expect(actual).toEqual(expected);
  });

  test("should return expected officeNumber", () => {
    const expected = 257;
    const actual = instance.getOfficeNumber();

    expect(actual).toEqual(expected);
  });
});