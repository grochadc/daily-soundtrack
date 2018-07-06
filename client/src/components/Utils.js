import React, { Component } from "react";

const Loading = () => <div>Loading...</div>;

const NotFound = () => <p>404: Sorry, not found</p>;

class SimpleForm extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
        />
        <button onClick={() => this.props.onSubmit(this.state.value)}>
          {this.props.button}
        </button>
      </div>
    );
  }
}

export { Loading, NotFound, SimpleForm };
