import validateMinLength from "./validateMinLength";

it("Returns true when the provided string length is greater than the character count", () =>
  expect(validateMinLength("abc", 2)).toBe(true));

it("Returns true when the provided string length is equal to the character count", () =>
  expect(validateMinLength("abc", 3)).toBe(true));

it("Returns false when the provided string length is smaller than the character count", () =>
  expect(validateMinLength("abc", 4)).toBe(false));
