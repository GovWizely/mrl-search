var React          = require('react');

var Header         = require('./header');
var KeywordInput   = require('./keyword-input');
var CountrySelect  = require('./country-select');
var IndustrySelect = require('./industry-select');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Header cssClass="header-condensed" />
        </div>

        <div className="col-md-5">
          <KeywordInput keyword={ this.props.keyword } onSubmit={ this.props.onSubmit } onChange={ this.props.onKeywordChange } expanded={ false } />
        </div>

        <div className="col-md-2">
          <IndustrySelect value={ this.props.industries } onChange={ this.props.onIndustryChange } />
        </div>

        <div className="col-md-2">
          <CountrySelect value={ this.props.countries } onChange={ this.props.onCountryChange } />
        </div>
      </div>
    );
  }
});
