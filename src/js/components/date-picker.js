var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');


module.exports = React.createClass({

  getInitialState: function() {
    return {
      startDate: ''
    };
  },
  componentWillMount: function() {
    this.setState({ startDate: this.props.date });
  },

  onChange: function(date) {
    this.setState({ startDate: date });
    if ((typeof this.props.onChange) === 'function') {
      this.props.onChange(date);
    }
  },

  render: function() {
    return( 
      <div className={ 'input-group' }>
        <DatePicker className={ 'form-control' } selected={ this.state.startDate } onChange={ this.onChange } />
      </div>
    );
  }
});