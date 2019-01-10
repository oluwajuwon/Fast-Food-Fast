import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../../src/components/authentication/Signup';

describe('Test for signup component', () => {
  const wrapper = shallow(<Signup />);
  it('Should contain 1 p element', () => {
    expect(wrapper.find('p').length).toBe(1);
  });
});
