var _      = require('lodash');
var React  = require('react');
var Select = require('react-select');
var Store  = require('../stores/aggregation-store');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      industries: [],
      values: [],
      isLoading: true
    };
  },
  componentWillMount: function() {
    Store.get('industries', function(industries) {
      this.setState({ industries: _.map(industries, function(industry) { return industry.key; }) });
      this.setState({ isLoading : false });
    }.bind(this));
  },
  onChange: function(values, __) {
    if (values) {
      this.setState({ values: _.compact(values.split(',')) });
    } else {
      this.setState({ values: [] });
    }
    if ((typeof this.props.onChange) === 'function') {
      this.props.onChange(values);
    }
  },
  options: function() {
    if (!this.state.industries) return null;
    return this.state.industries.map(function(industry) {
      return { label: industry, value: industry };
    });
  },
  render: function() {
    return (
      <Select isLoading={ this.state.isLoading } name="industries" multi={ true } placeholder="Search Industries" options={ this.options() } onChange={ this.onChange } value={ this.state.values } />
    );
  }
});
