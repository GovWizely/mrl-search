var React          = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var CountrySelect       = require('./country-select');
var IndustrySelect = require('./industry-select');
var ExpirationDatePicker = require('./date-picker');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Header cssClass="header-condensed" />
          </div>

          <div className="col-md-4">
            <KeywordInput keyword={ this.props.keyword } onChange={ this.props.onKeywordChange } expanded={ false } />
          </div>

          <div className="col-md-2">
            <CountrySelect placeholder="Select Country" values={ this.props.countries } onChange={ this.props.onCountryChange } />
          </div>
          <div className="col-md-2">
            <IndustrySelect placeholder="Select Industry" values={ this.props.industries } onChange={ this.props.onIndustryChange }/>
          </div>


        </div>

      
        <div className="row">
        
            <div className="col-md-4 date-input">
              <p className="text-muted">Expiration Date Start</p>
              <ExpirationDatePicker onChange={ this.props.onExpirationDateStartChange } date={ this.props.expiration_date_start }/>
            </div>
            <div className="col-md-4 date-input">
              <p className="text-muted">Expiration Date End</p>
              <ExpirationDatePicker onChange={ this.props.onExpirationDateEndChange } date={ this.props.expiration_date_end }/>
            </div>
            <div className="col-md-2 search-button-col">
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