var _      = require('lodash');
var React  = require('react');
var Select = require('react-select');

var CountryStore = require('../stores/country-store');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      countries: [],
      values: [],
      isLoading: true
    };
  },
  componentWillMount: function() {
    CountryStore.getCountries(function(countries) {
      this.setState({ countries: countries });
      this.setState({ values: this.props.values });
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
    return this.state.countries;
  },
  render: function() {
    return (
      <Select isLoading={ this.state.isLoading } name="countries" multi={ true } placeholder="Search Countries" options={ this.state.countries } onChange={ this.onChange } value={ this.state.values } />
    );
  }
});
