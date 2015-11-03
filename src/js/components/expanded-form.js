var React = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var CountrySelect       = require('./country-select');
var IndustrySelect = require('./industry-select')

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row page-header">
          <Header cssClass="text-center" />
        </div>

        <div className="row">
          <div className="col-md-8 keyword-input">
            <p className="text-muted">Search by Keyword</p>
            <KeywordInput keyword={ this.props.keyword } onSubmit={ this.props.onSubmit } onChange={ this.props.onKeywordChange } />
          </div>

          <div className="col-md-4 category-input">
            <p className="text-muted">Search by Category</p>
            <CountrySelect onChange={ this.props.onCountryChange }  placeholder="Select Country" items={ this.props.countries } />
            <IndustrySelect onChange={ this.props.onIndustryChange } placeholder="Select Industry" items={ this.props.industries } />
          </div>

        </div>
      </div>
    );
  }
});