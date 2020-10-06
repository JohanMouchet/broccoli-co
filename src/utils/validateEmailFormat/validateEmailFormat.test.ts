import validateEmailFormat from "./validateEmailFormat";

it("Returns true when provided with a valid email", () =>
  expect(validateEmailFormat("email@email.com")).toBe(true));

it("Returns false when provided with an invalid email", () =>
  expect(validateEmailFormat("email")).toBe(false));
