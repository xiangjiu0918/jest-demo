import { shallow } from "enzyme";
import UndoList from "../../UndoList";

test('快照测试', () => {
  const wrapper = shallow(<UndoList list={[]} />);
  expect(wrapper).toMatchSnapshot();
})

test('props.list为空时，列表展示为空', () => {
  const wrapper = shallow(<UndoList list={[]} />);
  // console.log(wrapper.find("[data-test-id='list-item']"));
  expect(wrapper.find("[data-test-id='list-item']").length).toBe(0);
})

test('props.list为不为空时，列表展示对应项', () => {
  const list = ['hello', 'world'];
  const wrapper = shallow(<UndoList list={list} />);
  const listItem = wrapper.find("[data-test-id='list-item']");
  expect(listItem.length).toBe(2);
  expect(listItem.at(0).text()).toBe('hello');
  expect(listItem.at(1).text()).toBe('world');
})

test('点击删除按钮时，调用props.deleteUndoItem', () => {
  const list = ['hello', 'world'];
  const func = jest.fn();
  const wrapper = shallow(<UndoList list={list} deleteUndoItem={func} />);
  const deleteBtn = wrapper.find("[data-test-id='delete-btn']");
  deleteBtn.at(0).simulate('click');
  expect(func).toHaveBeenCalled();
  expect(func).toHaveBeenLastCalledWith(0);
})
