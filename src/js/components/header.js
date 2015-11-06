var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      cssClass: ''
    };
  },
  render: function() {
    var className = "header ";
    className = className.concat(this.props.cssClass);
    return (
      <header className={ className }>
        <a href="#" onClick={ this.props.onClick }>
          Search Market Research Library
        </a>
      </header>
    );
  }
});
