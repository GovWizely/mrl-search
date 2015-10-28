var _     = require('lodash');
var React = require('react');

var ArticleStore = require('../stores/article-store');
var ArticleListItem = require('./article-list-item');

module.exports = React.createClass({
  _onChange: function() {
    this.setState({ articles: ArticleStore.getArticles() });
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  getInitialState: function() {
    return {
      articles: ArticleStore.getArticles()
    };
  },
  render: function() {
    return (
      <section className="articles">
        { _.map(this.state.articles, function(article) {
          return <ArticleListItem article={ article } />;
        })}
      </section>
    );
  }
});
