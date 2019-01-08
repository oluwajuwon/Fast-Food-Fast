import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';

describe('<App />', () => {
  const wrapper = shallow(<App />);
  it('Should contain 1 p element', () => {
    expect(wrapper.find('p').length).toBe(1);
  });
});
