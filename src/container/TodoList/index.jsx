import React, { Component } from "react";
import Header from "./Header";
import "./style.css";
import UndoList from "./UndoList";

export default class index extends Component {
  state = {
    undoList: [],
  };
  addUndoItem = (item) => {
    this.setState({
      undoList: [...this.state.undoList, item],
    });
  };
  deleteUndoItem = (index) => {
    const newUndoList = this.state.undoList;
    newUndoList.splice(index, 1);
    this.setState({ undoList: newUndoList });
  };
  render() {
    return (
      <div>
        <Header data-test-id="header" addUndoItem={this.addUndoItem} />
        <UndoList
          data-test-id="undo-list"
          list={this.state.undoList}
          deleteUndoItem={this.deleteUndoItem}
        />
      </div>
    );
  }
}
