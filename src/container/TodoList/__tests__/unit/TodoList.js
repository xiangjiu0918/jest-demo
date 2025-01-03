import { shallow } from "enzyme";
import TodoList from '../../index';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<TodoList />);
})

test('快照测试', () => {
  expect(wrapper).toMatchSnapshot();
})

test('state.undoList初始化为空', () => {
  expect(wrapper.state('undoList')).toEqual([]);
})

test('向header传入addUndoItem方法，当该方法被调用时，更新state.undoList', () => {
  const header = wrapper.find("[data-test-id='header']");
  expect(header.prop('addUndoItem')).toBeTruthy();
  expect(header.prop('addUndoItem')).toEqual(wrapper.instance().addUndoItem);
  const prevUndoList = ['hello'];
  wrapper.setState({ undoList: prevUndoList });
  const inputData = 'world';
  wrapper.instance().addUndoItem(inputData);
  expect(wrapper.state('undoList')).toEqual([...prevUndoList, inputData]);
})

test('向undoList组件传入list属性，属性值为state.undoList', () => {
  const undoList = wrapper.find("[data-test-id='undo-list']");
  expect(undoList.prop('list')).toBeTruthy();
  expect(undoList.prop('list')).toEqual(wrapper.state('undoList'));
})

test('向undoList组件传入deleteUndoItem方法，当该方法被调用时，更新state.undoList', () => {
  const undoListData = ['hello', 'world'];
  wrapper.setState({ undoList: [...undoListData] });
  const undoList = wrapper.find("[data-test-id='undo-list']");
  expect(undoList.prop('deleteUndoItem')).toBeTruthy();
  expect(undoList.prop('deleteUndoItem')).toEqual(wrapper.instance().deleteUndoItem);
  wrapper.instance().deleteUndoItem(0);
  expect(wrapper.state('undoList')).toEqual([undoListData[1]]);
})