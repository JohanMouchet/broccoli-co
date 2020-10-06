import validateMatching from "./validateMatching";

it("Returns true when provided with two matching strings", () =>
  expect(validateMatching("string", "string")).toBe(true));

it("Returns false when provided with two non matching strings", () =>
  expect(validateMatching("string", "different string")).toBe(false));
