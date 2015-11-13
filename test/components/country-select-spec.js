import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import CountrySelect from '../../src/js/components/country-select';

const { renderIntoDocument, findRenderedDOMComponentWithClass } = TestUtils;

describe('CountrySelect', () => {
  var props = {
    countries: [
      {label: 'Afghanistan', value: 'AF'},
      {label: 'Åland', value: 'AX'},
      {label: 'Albania', value: 'AL'},
    ],
    values: '',
    onChange: () => { return true; }
  };

  it('renders a select component', () => {
    const component = renderIntoDocument(
      <CountrySelect {...props} />
    );

    const selectDOM = findRenderedDOMComponentWithClass(component, 'Select-control');
    expect(selectDOM).to.not.equal(null);
  });

  it('renders a select component with options', () => {
    var countries = props.countries;
    const component = renderIntoDocument(
      <CountrySelect {...props} />
    );

    expect(component.options()).to.include(
      { label: countries[0].label, value: countries[0].value },
      { label: countries[1].label, value: countries[1].value },
      { label: countries[2].label, value: countries[2].value }
    );
  });

  it.skip('invoke onChange handler when onChange event triggered', () => {
    var o = {};
    var change = function() {
      o = { value: 1 };
    }.bind(this);

    const component = renderIntoDocument(
      <CountrySelect {...props} />
    );

    expect(o.value).to.equal(1);
  });
});