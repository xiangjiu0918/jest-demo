import React from "react";
import Header from "./Header";
import "./style.css";
import UndoList from "./UndoList";

export default function index() {
  const [undoList, changeUndoList] = React.useState([]);
  function addUndoItem(item) {
    changeUndoList([...undoList, item]);
  }
  function deleteUndoItem(index) {
    const newUndoList = [...undoList];
    newUndoList.splice(index, 1);
    changeUndoList(newUndoList);
  }
  return (
    <div>
      <Header data-testid="header" addUndoItem={addUndoItem} />
      <UndoList
        data-testid="undo-list"
        list={undoList}
        deleteUndoItem={deleteUndoItem}
      />
    </div>
  );
}
