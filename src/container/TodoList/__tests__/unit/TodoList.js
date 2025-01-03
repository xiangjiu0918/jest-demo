import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from '../../index';

beforeEach(() => {
  render(<TodoList />);
})

test('快照测试', () => {
  expect(screen).toMatchSnapshot();
})