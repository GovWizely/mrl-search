var Backbone = require('backbone');
var BackboneReact = require('backbone-react-component');
var React = require('react');

var SearchBar = require('./search-bar');
var Result = require('./result');

var Articles = require('../collections/articles');
var Industries = require('../collections/industries');

var countries = require('../collections/countries');

var searchBar = SearchBar({
  collection: {
    countries:  countries,
    industries: new Industries()
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      articles: new Articles()
    };
  },
  onSearch: function() {

  },
  render: function() {
    // search
    return (
      <div>
        { searchBar }
        <Result result={ { articles: this.state.articles } } />
      </div>
    );
  }
});
