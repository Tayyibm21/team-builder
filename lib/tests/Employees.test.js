const Employee = require("../employees");

const instance = new Employee(
"Adam Khan",
83,
"AdamKham@email.com");

describe("Employee", () => {
  test("should be an Employee", () => {
    const expected = "Employee";
    const actual = instance.getRole();

    expect(actual).toEqual(expected);
  });

  test("should return expected name", () => {
    const expected = "Adam Khan";
    const actual = instance.getName();

    expect(actual).toEqual(expected);
  });

  test("should return expected Id", () => {
    const expected = 83;
    const actual = instance.getId();

    expect(actual).toEqual(expected);
  });

  test("should return the expected email", () => {
    const expected = "AdamKham@email.com";
    const actual = instance.getEmail();

    expect(actual).toEqual(expected);
  });
});