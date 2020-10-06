import React from "react";
import { render } from "@testing-library/react";
import Main from "./Main";

it("Renders <Main /> without crashing", () => {
  expect(render(<Main>children</Main>).container.firstChild).toMatchSnapshot();
});
