var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      condensed: false
    };
  },
  render: function() {
    var className = "header";
    if (this.props.condensed) {
      className = className.concat(" header-condensed");
    } else {
      className = className.concat(" text-center");
    }
    return (
      <header className={ className }>
        <a href="#">
          Find Market Intelligence <span className="phase">beta</span>
        </a>
      </header>
    );
  }
});
