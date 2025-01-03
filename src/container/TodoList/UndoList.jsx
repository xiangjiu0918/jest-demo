import React, { Component } from "react";

export default class UndoList extends Component {
  render() {
    return (
      <ul className="undo-list-wrapper">
        {this.props.list.map((item, index) => {
          return (
            <li key={index} className="undo-list-item">
              <div data-test-id="list-item">{item}</div>
              <div
                data-test-id="delete-btn"
                className="undo-delete-btn"
                onClick={() => this.props.deleteUndoItem(index)}
              >
                -
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
