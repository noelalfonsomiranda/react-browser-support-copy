import React from 'react';
import { shallow } from 'enzyme';

import BrowserSupport from '../index';

const wrapper = (Component = BrowserSupport, props = {}, enzyme = shallow) =>
  enzyme(<Component {...props} />);

describe('<BrowserSupport />', () => {
  const minProps = {
    appComponent: <div />,
    children: {},
    className: '',
    showBoth: false,
    showDownloadLinks: true,
    style: {},
    config: {},
    unsupportedComponent: () => {}
  };

  it('render without exploding', () => {
    const renderComponent = wrapper(BrowserSupport, minProps);
    expect(renderComponent.length).toEqual(1);
  });

  it("should render a div", () => {
    const renderedComponent = wrapper(BrowserSupport, minProps);
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
