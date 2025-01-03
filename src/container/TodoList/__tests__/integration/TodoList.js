import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import TodoList from '../../index';

beforeEach(() => {
  render(<TodoList />);
});

test(`
  1. 用户进入网站
  2. 待办项显示为空
  `, () => {
  expect(screen.queryByTestId('list-item')).toBeNull();
})

test(`
  1. 用户输入待办项
  2. 用户敲击回车
  3. 待办项展示在下方
  5. 用户输入待办项，敲击回车，待办项新增在最下方
  6. 用户点击第一项删除按钮，第一项被删除
  7. 用户点击第一项删除按钮，待办项为空
  `, () => {
  const input = screen.getByTestId('input');
  let inputData = "hello";
  fireEvent.change(input, { target: { value: inputData } });
  fireEvent.keyUp(input, { keyCode: 13 });
  let undoListItem = screen.getByTestId('list-item');
  expect(undoListItem).toHaveTextContent(inputData);
  inputData = "world";
  fireEvent.change(input, { target: { value: inputData } });
  fireEvent.keyUp(input, { keyCode: 13 });
  undoListItem = screen.getAllByTestId('list-item');
  expect(undoListItem.length).toBe(2);
  expect(undoListItem[1]).toHaveTextContent(inputData);
  let deleteBtn = screen.getAllByTestId('delete-btn');
  fireEvent.click(deleteBtn[0]);
  undoListItem = screen.getByTestId('list-item');
  expect(undoListItem).toHaveTextContent("world");
  deleteBtn = screen.getByTestId('delete-btn');
  fireEvent.click(deleteBtn);
  expect(screen.queryByTestId('list-item')).toBeNull();
});