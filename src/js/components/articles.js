var Backbone = require('backbone');
var BackboneReact = require('backbone-react-component');
var React = require('react');

module.exports = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  createArticle: function(article) {
    return (
      <article className="article" key={ article.id }>
        <h1 className="title">
          <a target="_blank" href={ article.url } dangerouslySetInnerHTML={ { __html: article.title } }></a>
        </h1>
        <p className="url"><a target="_blank" href={ article.url }>{ article.url }</a></p>
        <p className="snippet" dangerouslySetInnerHTML={ { __html: article.snippet } }></p>
      </article>
    );
  },
  render: function() {
    return (
      <section className="articles">
        { this.state.collection.map(this.createArticle) }
      </section>
    );
  }
});
