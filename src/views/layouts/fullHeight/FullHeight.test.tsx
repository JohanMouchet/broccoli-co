import React from "react";
import { render } from "@testing-library/react";
import FullHeight from "./FullHeight";

it("Renders <FullHeight /> without crashing", () => {
  expect(
    render(<FullHeight>children</FullHeight>).container.firstChild
  ).toMatchSnapshot();
});
