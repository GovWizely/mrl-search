var Backbone      = require('backbone');
var BackboneReact = require('backbone-react-component');
var React         = require('react');
var Select        = require('react-select');
var Industries    = require('../collections/industries');

module.exports = React.createClass({
  componentWillMount: function() {
    BackboneReact.on(this, {
      collections: {
        industries: new Industries()
      }
    });
  },
  componentWillUnmount: function() {
    BackboneReact.off(this);
  },
  options: function() {
    return this.state.industries.map(function(industry) {
      return { label: industry.name, value: industry.name };
    });
  },
  render: function() {
    return (
      <Select name="industries" multi={ true } placeholder="Search Industries" options={ this.options() } onChange={ this.props.onChange } value={ this.props.value } />
    );
  }
});
