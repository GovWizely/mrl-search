import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import IndustrySelect from '../../src/js/components/industry-select';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;

describe('IndustrySelect', () => {
  var props = {
    industries: [
      {label: 'Aerospace & Defense', value: 'Aerospace & Defense'},
      {label: 'Agribusiness', value: 'Agribusiness'},
      {label: 'Apparel & Textiles', value: 'Apparel & Textiles'}
    ],
    values: '',
    onChange: () => { return true; }
  };

  it('renders a select component', () => {
    const component = renderIntoDocument(
      <IndustrySelect {...props} />
    );

    const selectDOM = findRenderedDOMComponentWithClass(component, 'Select-control');
    expect(selectDOM).to.not.equal(null);
  });

  it('renders a select component with options', () => {
    var industries = props.industries;
    const component = renderIntoDocument(
      <IndustrySelect {...props} />
    );

    expect(component.options()).to.include(
      { label: industries[0].label, value: industries[0].value },
      { label: industries[1].label, value: industries[1].value },
      { label: industries[2].label, value: industries[2].value }
    );
  });

  it.skip('invoke onChange handler when onChange event triggered', () => {
    var o = {};
    var change = function() {
      o = { value: 1 };
    }.bind(this);

    const component = renderIntoDocument(
      <IndustrySelect {...props} />
    );

    expect(o.value).to.equal(1);
  });
});