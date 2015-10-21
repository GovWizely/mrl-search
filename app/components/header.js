var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      title: 'Find Market Intelligence'
    };
  },
  render: function() {
    return (
      <header className="header text-center">
        { this.state.title } <span className="phase">beta</span>
      </header>);
  }
});
