var Backbone      = require('backbone');
var BackboneReact = require('backbone-react-component');
var React         = require('react');
var Select        = require('react-select');

var Countries     = require('../collections/countries');

module.exports = React.createClass({
  componentWillMount: function() {
    BackboneReact.on(this, {
      collections: {
        countries: Countries
      }
    });
  },
  componentWillUnmount: function() {
    BackboneReact.off(this);
  },
  options: function() {
    return this.state.countries;
  },
  render: function() {
    return (
      <Select name="countries" multi={ true } placeholder="Search Countries" options={ this.options() } onChange={ this.props.onChange } value={ this.props.value } />
    );
  }
});
