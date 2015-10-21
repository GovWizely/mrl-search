var Backbone = require('backbone');
var BackboneReact = require('backbone-react-component');
var React = require('react');

var Articles = require('./articles');
var SearchMessage = require('./search-message');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      keyword: '',
      count: -1,
      displaySearchMessage: false,
    };
  },
  render: function() {
    return (
      <div>
        <SearchMessage count={ this.props.result.articles.length } />
        <Articles collection={ this.props.result.articles } />
      </div>
    );
  }
});
