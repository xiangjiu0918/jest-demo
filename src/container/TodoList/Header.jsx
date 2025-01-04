import React from "react";

export default function Header(props) {
  const [inputData, changeInputData] = React.useState("");
  function handleKeyUp(e) {
    if (e.keyCode === 13 && inputData !== "") {
      props.addUndoItem(inputData);
      changeInputData("");
    }
  }
  return (
    <div className="header-wrapper">
      <span className="header-span">TodoList</span>
      <input
        data-testid="input"
        className="header-input"
        value={inputData}
        placeholder="请输入待办项"
        onChange={(e) => changeInputData(e.target.value)}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}
