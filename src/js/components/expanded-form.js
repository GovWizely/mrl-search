var React = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var CountrySelect       = require('./country-select');
var IndustrySelect = require('./industry-select');
var ExpirationDatePicker = require('./date-picker');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row page-header">
          <Header cssClass="text-center" />
        </div>

        <div className="row expanded-row">
          <div className="col-md-12 keyword-input">
            <p className="text-muted">Search by Keyword</p>
            <KeywordInput keyword={ this.props.keyword } onChange={ this.props.onKeywordChange } />
          </div>
        </div>

        <div className="row expanded-row">
          <div className="col-md-6 category-input">
            <p className="text-muted">Search by Country</p>
            <CountrySelect onChange={ this.props.onCountryChange }  placeholder="Select Country"  />
          </div>
          <div className="col-md-6 category-input">
            <p className="text-muted">Search by Industry</p>
            <IndustrySelect onChange={ this.props.onIndustryChange } placeholder="Select Industry"  />
          </div>
        </div>

        <div className="row expanded-row expanded-bottom-row">
          <div className="col-md-4 date-input">
            <p className="text-muted"> Expiration Date Start </p>
            <ExpirationDatePicker onChange={ this.props.onExpirationDateStartChange } />
          </div>

          <div className="col-md-4 date-input">
            <p className="text-muted"> Expiration Date End </p>
            <ExpirationDatePicker onChange={ this.props.onExpirationDateEndChange } />
          </div>

          <div className="col-md-4 search-button-col">
            <span className="input-group-btn">
              <button id="search-button" className={ 'btn btn-success btn-lg' } type="button" onClick={ this.props.onSubmit }>
                Search
              </button>
            </span>
          </div>
        </div>

      </div>
    );
  }
});