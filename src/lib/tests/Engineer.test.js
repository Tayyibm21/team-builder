const Engineer = require("../Engineer");

const instance = new Engineer(
  "Tony Montana",
  62,
  "Tonymontata@email.com",
  "Tmontana"
);

describe("Engineer", () => {
  test("should be an Engineer", () => {
    const expected = "Engineer";
    const actual = instance.getRole();

    expect(actual).toEqual(expected);
  });

  test("should return expected name", () => {
    const expected = "Tony Montana";
    const actual = instance.getName();

    expect(actual).toEqual(expected);
  });

  test("should return expected Id", () => {
    const expected = 62;
    const actual = instance.getId();

    expect(actual).toEqual(expected);
  });

  test("should return the expected email", () => {
    const expected = "Tonymontata@email.com";
    const actual = instance.getEmail();

    expect(actual).toEqual(expected);
  });

  test("should return the expected github", () => {
    const expected = "Tmontana";
    const actual = instance.getGithub();

    expect(actual).toEqual(expected);
  });
});