import React from "react";
import { render } from "@testing-library/react";
import Button from ".";

it("Renders <Button /> without crashing", () => {
  expect(
    render(<Button block>children</Button>).container.firstChild
  ).toMatchSnapshot();
});
