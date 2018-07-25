import React from 'react';
import { shallow } from 'enzyme';

import BrowserSupport from '../index';

const wrapper = (Component = BrowserSupport, props = {}, enzyme = shallow) =>
  enzyme(<Component {...props} />);

describe('<BrowserSupport />', () => {
  const minProps = {
    supported: {},
    style: {},
    className: {},
    children: {}
  };

  it('render without exploding', () => {
    const renderComponent = wrapper(BrowserSupport, minProps);
    expect(renderComponent.length).toEqual(1);
  });

  it("should not render div's", () => {
    const renderedComponent = wrapper(BrowserSupport, minProps);
    expect(renderedComponent.find('div').length).toEqual(0);
  });
});
