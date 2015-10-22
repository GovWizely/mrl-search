var Backbone       = require('backbone');
var BackboneReact  = require('backbone-react-component');
var React          = require('react');

var Spinner        = require('./spinner');
var Header         = require('./header');
var Keyword        = require('./keyword-searchbox');
var CountrySelect  = require('./country-select');
var IndustrySelect = require('./industry-select');
var Articles       = require('./articles');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      loading: true
    };
  },
  spinner: React.createElement(Spinner),
  displaySpinner: function() {
    if (this.state.loading) {
      return this.spinner;
    }
    return null;
  },
  render: function() {
    this.props.collection.on('fetch', function() {
      this.setState({ loading: true });
    }.bind(this));

    this.props.collection.on('sync', function() {
      this.setState({ loading: false });
    }.bind(this));

    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Header condensed={ true } />
          </div>
          <div className="col-md-5">
            <Keyword keyword={ this.props.keyword } onSearch={ this.props.onKeywordSearch } onChange={ this.props.onKeywordChange } condensed={ true } />
          </div>
          <div className="col-md-2">
            <IndustrySelect value={ this.props.industries } onChange={ this.props.onIndustryChange } />
          </div>
          <div className="col-md-2">
            <CountrySelect value={ this.props.countries } onChange={ this.props.onCountryChange } />
          </div>
        </div>
        <div className="row">
          { this.displaySpinner() }
          <Articles collection={ this.props.collection } />
        </div>
      </div>
    );
  }
});
