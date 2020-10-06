import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

it("Renders <Loader /> without crashing", () => {
  expect(render(<Loader />).container.firstChild).toMatchSnapshot();
});
