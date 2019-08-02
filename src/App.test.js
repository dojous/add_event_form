import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import EventHandler from "./components/eventHandler";

it("renders without crashing", () => {
  shallow(<App />);
});

it("App includes EventHandler", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.containsMatchingElement(<EventHandler />)).toEqual(true);
});
