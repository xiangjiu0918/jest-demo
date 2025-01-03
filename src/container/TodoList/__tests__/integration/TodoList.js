import { mount } from 'enzyme';
import TodoList from '../../index';

let wrapper;

beforeAll(() => {
  wrapper = mount(<TodoList />);
});

test(`
  1. 用户进入网站
  2. 待办项显示为空
  `, () => {
  const undoListItem = wrapper.find("[data-test-id='list-item']");
  expect(undoListItem.length).toBe(0);
})

test(`
  1. 用户输入待办项
  2. 用户敲击回车
  3. 待办项展示在下方
  `, () => {
  const input = wrapper.find("[data-test-id='input']");
  const inputData = "hello";
  input.simulate('change', { target: { value: inputData } });
  input.simulate('keyUp', { keyCode: 13 });
  const undoListItem = wrapper.find("[data-test-id='list-item']")
  expect(undoListItem.length).toBe(1);
  expect(undoListItem.text()).toBe(inputData);
});

test(`
  1. 用户输入待办项
  2. 用户敲击回车
  3. 在原待办项下方新增待办项
  `, () => {
  const input = wrapper.find("[data-test-id='input']");
  const inputData = "world";
  input.simulate('change', { target: { value: inputData } });
  input.simulate('keyUp', { keyCode: 13 });
  const undoListItem = wrapper.find("[data-test-id='list-item']");
  expect(undoListItem.length).toBe(2);
  expect(undoListItem.at(1).text()).toBe(inputData);
});

test(`
  1. 用户点击第一项的删除按钮
  2. 第一项被删除
  `, () => {
  const deleteBtn = wrapper.find("[data-test-id='delete-btn']");
  deleteBtn.at(0).simulate('click');
  const undoListItem = wrapper.find("[data-test-id='list-item']");
  expect(undoListItem.length).toBe(1);
  expect(undoListItem.text()).toBe("world");
})

test(`
  1. 用户点击第一项的删除按钮
  2. 第一项被删除
  `, () => {
  const deleteBtn = wrapper.find("[data-test-id='delete-btn']");
  deleteBtn.at(0).simulate('click');
  const undoListItem = wrapper.find("[data-test-id='list-item']");
  expect(undoListItem.length).toBe(0);
})