jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
import React, { useState as useStateMock } from 'react';
import { shallow } from "enzyme";
import Header from '../../Header';

// const changeInputData = jest.fn();
// const useStateSpy = jest.spyOn(React, "useState");
// useStateSpy.mockImplementation(init => [init, changeInputData]);

const changeInputData = jest.fn();
useStateMock.mockImplementation(init => [init, changeInputData]);

test('快照测试', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
})

test('输入框的展示值初始化为空', () => {
  const wrapper = shallow(<Header />);
  const input = wrapper.find("[data-test-id='input']");
  expect(input.prop('value')).toBe('');
})

test('输入框输入字符时，state.inputData随之改变', () => {
  const wrapper = shallow(<Header />);
  const input = wrapper.find("[data-test-id='input']");
  const inputData = "hello world";
  input.simulate('change', { target: { value: inputData } });
  expect(changeInputData).toHaveBeenLastCalledWith(inputData);
})

test('当输入框不为空时，用户敲击回车后，调用props.addUndoItem，state.inputData清空', () => {
  const inputData = "hello world";
  useStateMock.mockImplementation(init => [inputData, changeInputData]);
  const func = jest.fn();
  const wrapper = shallow(<Header addUndoItem={func} />);
  const input = wrapper.find("[data-test-id='input']");
  input.simulate('keyUp', { keyCode: 13 });
  expect(func).toHaveBeenCalled();
  expect(func).toHaveBeenLastCalledWith(inputData);
  expect(changeInputData).toHaveBeenLastCalledWith('');
})

test('当输入框为空时，用户敲击回车后，不调用props.addUndoItem', () => {
  useStateMock.mockImplementation(init => [init, changeInputData]);
  const func = jest.fn();
  const wrapper = shallow(<Header addUndoItem={func} />);
  const input = wrapper.find("[data-test-id='input']");
  input.simulate('keyUp', { keyCode: 13 });
  expect(func).not.toHaveBeenCalled();
})