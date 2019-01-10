import React from 'react';
import { shallow } from 'enzyme';
import Index from '../../src/components/Index';

describe('Test for index component', () => {
  const wrapper = shallow(<Index />);
  it('Should contain 1 p element', () => {
    expect(wrapper.find('p').length).toBe(1);
  });
});
