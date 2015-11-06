var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      startDate: moment(),
      isLoading: true
    };
  },
  componentWillMount: function() {
    this.setState({ startDate: this.props.date });
    this.setState({ isLoading : false });
  },

  onChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  render: function() {
    return <DatePicker
        isLoading={ this.state.isLoading }
        selected={ this.state.startDate }
        onChange={ this.onChange } />;
  }
});

//dateFormat: "YYYY-MM-DD"