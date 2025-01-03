import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import UndoList from "../../UndoList";

test('快照测试', () => {
  render(<UndoList list={[]} />);
  expect(screen).toMatchSnapshot();
})

test('props.list为空时，列表展示为空', () => {
  render(<UndoList list={[]} />);
  expect(screen.queryByTestId('list-item')).toBeNull();
})

test('props.list为不为空时，列表展示对应项', () => {
  const list = ['hello', 'world'];
  render(<UndoList list={list} />);
  const listItem = screen.getAllByTestId('list-item');
  expect(listItem.length).toBe(2);
  expect(listItem[0]).toHaveTextContent(list[0]);
  expect(listItem[1]).toHaveTextContent(list[1]);
})

test('点击删除按钮时，调用props.deleteUndoItem', () => {
  const list = ['hello', 'world'];
  const func = jest.fn();
  render(<UndoList list={list} deleteUndoItem={func} />);
  const deleteBtn = screen.getAllByTestId('delete-btn');
  fireEvent.click(deleteBtn[0])
  expect(func).toHaveBeenCalled();
  expect(func).toHaveBeenLastCalledWith(0);
})
