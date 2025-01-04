import React from "react";

export default function UndoList(props) {
  return (
    <ul className="undo-list-wrapper">
      {props.list.map((item, index) => {
        return (
          <li key={index} className="undo-list-item">
            <div data-testid="list-item">{item}</div>
            <div
              data-testid="delete-btn"
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
