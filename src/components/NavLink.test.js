import React from 'react';
import { shallow } from 'enzyme';
import NavLink from './NavLink';

describe('<NavLink />', () => {
  it('renders a <Link />', () => {
    const wrapper = shallow(<NavLink />);
    expect(wrapper.is('Link')).toBe(true);
  });
});
