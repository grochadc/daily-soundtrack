import React, { Component } from "react";
import renderer from "react-test-renderer";
import track from "./track.json";
import TrackInfo from "../TrackInfo";

jest.mock("react-bootstrap");

test("Renders a track", () => {
  const component = renderer.create(<TrackInfo track={track} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
