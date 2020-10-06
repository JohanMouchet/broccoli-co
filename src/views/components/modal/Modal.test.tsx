import React from "react";
import { render } from "@testing-library/react";
import Modal from "./Modal";

it("Renders <Modal /> without crashing", () => {
  expect(
    render(
      <Modal triggerLabel="Open" isOpen={false}>
        children
      </Modal>
    ).container.firstChild
  ).toMatchSnapshot();
});
