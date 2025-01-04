import React from "react";
import Header from "./Header";
import "./style.css";
import UndoList from "./UndoList";

export default function index(props) {
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
      {props.testFunc && props.testFunc(undoList, addUndoItem, deleteUndoItem)}
      <Header data-test-id="header" addUndoItem={addUndoItem} />
      <UndoList
        data-test-id="undo-list"
        list={undoList}
        deleteUndoItem={deleteUndoItem}
      />
    </div>
  );
}
