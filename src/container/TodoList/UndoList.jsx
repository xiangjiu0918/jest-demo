import React from "react";

export default function UndoList(props) {
  return (
    <ul className="undo-list-wrapper">
      {props.list.map((item, index) => {
        return (
          <li key={index} className="undo-list-item">
            <div data-test-id="list-item">{item}</div>
            <div
              data-test-id="delete-btn"
              className="undo-delete-btn"
              onClick={() => props.deleteUndoItem(index)}
            >
              -
            </div>
          </li>
        );
      })}
    </ul>
  );
}
