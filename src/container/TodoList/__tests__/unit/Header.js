jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
import React, { useState as useStateMock } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../../Header';

const changeInputData = jest.fn();
useStateMock.mockImplementation(init => [init, changeInputData]);

test('快照测试', () => {
  render(<Header />);
  expect(screen).toMatchSnapshot();
})

test('输入框初始化为空', () => {
  render(<Header />);
  expect(screen.getByTestId('input')).toHaveValue('');
})

test('输入字符时，inputData随之改变', () => {
  render(<Header />);
  const input = screen.getByTestId('input');
  const inputData = "hello world";
  fireEvent.change(input, { target: { value: inputData } });
  expect(changeInputData).toHaveBeenCalledWith(inputData);
})

test('当输入框不为空时，用户敲击回车后，调用props.addUndoItem，输入框清空', () => {
  const inputData = "hello world";
  const changeInputData = jest.fn();
  useStateMock.mockImplementation(init => [inputData, changeInputData]);
  const func = jest.fn();
  render(<Header addUndoItem={func} />);
  const input = screen.getByTestId('input');
  fireEvent.keyUp(input, { keyCode: 13 });
  expect(func).toHaveBeenCalled();
  expect(func).toHaveBeenLastCalledWith(inputData);
  expect(changeInputData).toHaveBeenLastCalledWith('');
})

test('当输入框为空时，用户敲击回车后，不调用props.addUndoItem', () => {
  const changeInputData = jest.fn();
  useStateMock.mockImplementation(init => [init, changeInputData]);
  const func = jest.fn();
  render(<Header addUndoItem={func} />);
  fireEvent.keyUp(screen.getByTestId('input'), { keyCode: 13 });
  expect(func).not.toHaveBeenCalled();
})