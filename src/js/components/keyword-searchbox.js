var Backbone      = require('backbone');
var BackboneReact = require('backbone-react-component');
var _             = require('lodash');
var React         = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      condensed: false
    };
  },
  render: function() {
    var inputClass     = 'form-control';
    var buttonClass    = 'btn btn-success';
    var containerClass = 'input-group';
    if (!this.props.condensed) {
      inputClass     = inputClass.concat(' input-lg');
      buttonClass    = buttonClass.concat(' btn-lg');
      containerClass = containerClass.concat(' col-md-10');
    }
    return (
      <div className={ containerClass }>
        <input type="text" className={ inputClass } name="keyword" value={ this.props.keyword } onChange={ this.props.onChange } onKeyDown={ this.props.onSearch } placeholder="Keyword" />
        <span className="input-group-btn">
          <button className={ buttonClass } type="button" onClick={ this.props.onSearch }>
            <i className="fa fa-search"></i>
          </button>
        </span>
      </div>
    );
  }
});
