import React from "react";
import { render } from "@testing-library/react";
import Field from "./Field";

it("Renders <Field /> without crashing", () => {
  expect(
    render(<Field type="text" name="name" value="Value" />).container.firstChild
  ).toMatchSnapshot();
});
