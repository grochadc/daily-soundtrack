import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";

class TrackMessage extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.sendMessage(event.target.value);
  }
  render() {
    return (
      <FormGroup>
        <h5>Add a message:</h5>
        <FormControl
          componentClass="textarea"
          placeholder="textarea"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
  }
}

export default TrackMessage;
