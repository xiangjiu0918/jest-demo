import { shallow } from "enzyme";
import Header from '../../Header';

test('快照测试', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
})

test('输入框的展示值为state，state.inputData初始化为空', () => {
  const wrapper = shallow(<Header />);
  const input = wrapper.find("[data-test-id='input']");
  expect(input.prop('value')).toBe(wrapper.state('inputData'));
  expect(wrapper.state('inputData')).toBe('');
})

test('输入框输入字符时，state.inputData随之改变', () => {
  const wrapper = shallow(<Header />);
  const input = wrapper.find("[data-test-id='input']");
  const inputData = "hello world";
  input.simulate('change', { target: { value: inputData } });
  expect(wrapper.state('inputData')).toBe(inputData);
})

test('当输入框不为空时，用户敲击回车后，调用props.addUndoItem，state.inputData清空', () => {
  const func = jest.fn();
  const wrapper = shallow(<Header addUndoItem={func} />);
  const inputData = "hello world";
  wrapper.setState({ inputData });
  const input = wrapper.find("[data-test-id='input']");
  input.simulate('keyUp', { keyCode: 13 });
  expect(func).toHaveBeenCalled();
  expect(func).toHaveBeenLastCalledWith(inputData);
  expect(wrapper.state('inputData')).toBe('');
})

test('当输入框为空时，用户敲击回车后，调用props.addUndoItem，state.inputData清空', () => {
  const func = jest.fn();
  const wrapper = shallow(<Header addUndoItem={func} />);
  wrapper.setState({ inputData: '' });
  const input = wrapper.find("[data-test-id='input']");
  input.simulate('keyUp', { keyCode: 13 });
  expect(func).not.toHaveBeenCalled();
})