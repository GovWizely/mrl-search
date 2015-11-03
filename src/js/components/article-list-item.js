var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <article className="article">
        <h1 className="title">
          <a target="_blank" href={ this.props.article.url } dangerouslySetInnerHTML={ { __html: this.props.article.title } }></a>
        </h1>
        <p className="url"><a target="_blank" href={ this.props.article.url }>{ this.props.article.url }</a></p>
        <p className="description" dangerouslySetInnerHTML={ { __html: this.props.article.description } }></p>
        <p className="industries" dangerouslySetInnerHTML={ { __html: "Industries:  " + this.props.article.industries } }></p>
        <p className="ita_industries" dangerouslySetInnerHTML={ { __html: "ITA Industries:  " + this.props.article.ita_industries } }></p>
        <p className="countries" dangerouslySetInnerHTML={ { __html: "Countries:  " + this.props.article.countries } }></p>
        <p className="expiration_date" dangerouslySetInnerHTML={ { __html: "Expiration Date:  " + this.props.article.expiration_date } }></p>
        <p className="report_type" dangerouslySetInnerHTML={ { __html: "Report Type:  " + this.props.article.report_type } }></p>
      </article>
    );
  }
});
