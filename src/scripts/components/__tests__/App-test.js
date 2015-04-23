//jest.dontMock('object-assign');

jest.dontMock('../App.js');

import React from 'react/addons';
const {TestUtils} = React.addons;
import App from '../App.js';


describe('App', () => {
  it('generate appname in <h1>', () => {
    var app = TestUtils.renderIntoDocument(<App />);
    var title = TestUtils.findRenderedDOMComponentWithTag(app, 'h1');
    expect(title.getDOMNode().textContent).toEqual('GOL (Game of Life) with React');
  });
});
