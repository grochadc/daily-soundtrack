import React from "react";
import renderer from "react-test-renderer";
import track from "./trackpost.json";
import TrackLink from "../TrackLink";

jest.mock("react-bootstrap");

test("Renders a track link", () => {
  const component = renderer.create(<TrackLink {...track} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
