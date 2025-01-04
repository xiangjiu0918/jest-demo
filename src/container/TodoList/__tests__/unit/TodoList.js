jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
import React, { useState as useStateMock } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from '../../index';

const changeUndoList = jest.fn();
useStateMock.mockImplementation(init => [init, changeUndoList]);

let addUndoItem, deleteUndoItem, undoListData;
const testFunc = (undo, add, del) => {
  undoListData = undo;
  addUndoItem = add;
  deleteUndoItem = del;
}

test('快照测试', () => {
  render(<TodoList testFunc={testFunc} />);
  expect(screen).toMatchSnapshot();
})

test('state.undoList初始化为空', () => {
  render(<TodoList testFunc={testFunc} />);
  expect(undoListData).toEqual([]);
})

test('当调用addUndoItem方法时，更新state.undoList', () => {
  render(<TodoList testFunc={testFunc} />);
  const inputData = 'world';
  addUndoItem(inputData);
  expect(changeUndoList).toHaveBeenLastCalledWith([inputData]);
})


test('当调用deleteUndoItem方法时，更新state.undoList', () => {
  const undoListData = ['hello', 'world'];
  useStateMock.mockImplementation(init => [undoListData, changeUndoList]);
  render(<TodoList testFunc={testFunc} />);
  deleteUndoItem(0);
  expect(changeUndoList).toHaveBeenLastCalledWith([undoListData[1]]);
})