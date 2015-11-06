var React          = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var CountrySelect       = require('./country-select');
var IndustrySelect = require('./industry-select');
var ExpirationDatePicker = require('./date-picker');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Header cssClass="header-condensed" />
        </div>

        <div className="col-md-3">
          <KeywordInput keyword={ this.props.keyword } onSubmit={ this.props.onSubmit } onChange={ this.props.onKeywordChange } expanded={ false } />
        </div>
        <div className="col-md-2">
          <CountrySelect placeholder="Select Country" values={ this.props.countries } onChange={ this.props.onCountryChange } />
        </div>
        <div className="col-md-2">
          <IndustrySelect placeholder="Select Industry" values={ this.props.industries } onChange={ this.props.onIndustryChange }/>
        </div>
        <div className="col-md-2">
          <p className="text-muted">Expiration Date Start</p>
          <ExpirationDatePicker onChange={ this.props.onExpirationDateStartChange } date={ this.props.expiration_date_start }/>
          <p className="text-muted">Expiration Date End</p>
          <ExpirationDatePicker onChange={ this.props.onExpirationDateEndChange } date={ this.props.expiration_date_end }/>
        </div>

      </div>
    );
  }
});