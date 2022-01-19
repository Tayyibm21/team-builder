const Intern = require("../Intern");

const instance = new Intern(
"Aman Ahmed",
29,
"AmanAhmed@email.com",
"University of birmingham"
);

describe("Intern", () => {
  test("should be an Intern", () => {
    const expected = "Intern";
    const actual = instance.getRole();

    expect(actual).toEqual(expected);
  });

  test("should return expected name", () => {
    const expected = "Aman Ahmed";
    const actual = instance.getName();

    expect(actual).toEqual(expected);
  });

  test("should return expected Id", () => {
    const expected = 29;
    const actual = instance.getId();

    expect(actual).toEqual(expected);
  });

  test("should return the expected email", () => {
    const expected = "AmanAhmed@email.com";
    const actual = instance.getEmail();

    expect(actual).toEqual(expected);
  });

  test("should return expected school", () => {
    const expected = "University of birmingham";
    const actual = instance.getSchool();

    expect(actual).toEqual(expected);
  });
});