import React from "react";
import { FormGroup, FormControl } from "react-bootstrap";

export default function TrackMesssage(props) {
  return (
    <FormGroup>
      <h5>Add a message:</h5>
      <FormControl
        componentClass="textarea"
        placeholder="textarea"
        {...props}
      />
    </FormGroup>
  );
}
