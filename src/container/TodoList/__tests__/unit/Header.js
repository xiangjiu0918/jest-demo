import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../../Header';

test('快照测试', () => {
  render(<Header />);
  expect(screen).toMatchSnapshot();
})

test('输入框初始化为空', () => {
  render(<Header />);
  expect(screen.getByTestId('input')).toHaveValue('');
})

test('当输入框不为空时，用户敲击回车后，调用props.addUndoItem，输入框清空', () => {
  const func = jest.fn();
  render(<Header addUndoItem={func} />);
  const inputData = "hello world";
  const input = screen.getByTestId('input');
  fireEvent.change(input, { target: { value: inputData } });
  fireEvent.keyUp(input, { keyCode: 13 });
  expect(func).toHaveBeenCalled();
  expect(func).toHaveBeenLastCalledWith(inputData);
  expect(screen.getByTestId('input')).toHaveValue('');
})

test('当输入框为空时，用户敲击回车后，不调用props.addUndoItem', () => {
  const func = jest.fn();
  render(<Header addUndoItem={func} />);
  fireEvent.keyUp(screen.getByTestId('input'), { keyCode: 13 });
  expect(func).not.toHaveBeenCalled();
})