import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../src/components/authentication/Login';

describe('Test for login component', () => {
  const wrapper = shallow(<Login />);
  it('Should contain 1 p element', () => {
    expect(wrapper.find('p').length).toBe(1);
  });
});
