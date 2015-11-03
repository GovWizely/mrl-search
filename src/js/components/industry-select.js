var _      = require('lodash');
var React  = require('react');
var Select = require('react-select');
var IndustryStore  = require('../stores/industry-store');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      industries: [],
      values: [],
      isLoading: true
    };
  },
  componentWillMount: function() {
    IndustryStore.getIndustries(function(industries) {
      this.setState({ industries: industries });
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
    return this.state.industries;
  },
  render: function() {
    return (
      <Select isLoading={ this.state.isLoading } name="industries" multi={ true } placeholder="Search Industries" options={ this.options() } onChange={ this.onChange } value={ this.state.values } />
    );
  }
});
