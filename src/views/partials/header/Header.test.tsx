import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

it("Renders <Header /> without crashing", () => {
  expect(
    render(<Header>children</Header>).container.firstChild
  ).toMatchSnapshot();
});
