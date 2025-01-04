jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
import React, { useState as useStateMock } from 'react';
import { shallow } from "enzyme";
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
  const wrapper = shallow(<TodoList testFunc={testFunc} />);
  expect(wrapper).toMatchSnapshot();
})

test('state.undoList初始化为空', () => {
  const wrapper = shallow(<TodoList testFunc={testFunc} />);
  expect(undoListData).toEqual([]);
})

test('向header传入addUndoItem方法，当该方法被调用时，更新state.undoList', () => {
  const wrapper = shallow(<TodoList testFunc={testFunc} />);
  const header = wrapper.find("[data-test-id='header']");
  expect(header.prop('addUndoItem')).toBeTruthy();
  expect(header.prop('addUndoItem')).toEqual(addUndoItem);
  const inputData = 'world';
  addUndoItem(inputData);
  expect(changeUndoList).toHaveBeenLastCalledWith([inputData]);
})

test('向undoList组件传入list属性，属性值为state.undoList', () => {
  const wrapper = shallow(<TodoList testFunc={testFunc} />);
  const undoList = wrapper.find("[data-test-id='undo-list']");
  expect(undoList.prop('list')).toBeTruthy();
  expect(undoList.prop('list')).toEqual(undoListData);
})

test('向undoList组件传入deleteUndoItem方法，当该方法被调用时，更新state.undoList', () => {
  const undoListData = ['hello', 'world'];
  useStateMock.mockImplementation(init => [undoListData, changeUndoList]);
  const wrapper = shallow(<TodoList testFunc={testFunc} />);
  const undoList = wrapper.find("[data-test-id='undo-list']");
  expect(undoList.prop('deleteUndoItem')).toBeTruthy();
  expect(undoList.prop('deleteUndoItem')).toEqual(deleteUndoItem);
  deleteUndoItem(0);
  expect(changeUndoList).toHaveBeenLastCalledWith([undoListData[1]]);
})