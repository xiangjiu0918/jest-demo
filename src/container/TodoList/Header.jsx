import React, { Component } from "react";

export default class Header extends Component {
  state = {
    inputData: "",
  };
  handleKeyUp = (e) => {
    if (e.keyCode === 13 && this.state.inputData !== "") {
      this.props.addUndoItem(this.state.inputData);
      this.setState({ inputData: "" });
    }
  };
  render() {
    return (
      <div className="header-wrapper">
        <span className="header-span">TodoList</span>
        <input
          data-test-id="input"
          className="header-input"
          value={this.state.inputData}
          placeholder="请输入待办项"
          onChange={(e) => this.setState({ inputData: e.target.value })}
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}
