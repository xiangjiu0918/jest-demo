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

beforeEach(() => {
  render(<TodoList testFunc={testFunc} />);
})

test('快照测试', () => {
  expect(screen).toMatchSnapshot();
})

test('state.undoList初始化为空', () => {
  expect(undoListData).toEqual([]);
})