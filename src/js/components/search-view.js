var Backbone       = require('backbone');
var BackboneReact  = require('backbone-react-component');
var React          = require('react');

var Header         = require('./header');
var Keyword        = require('./keyword-searchbox');
var CountrySelect  = require('./country-select');
var IndustrySelect = require('./industry-select');

module.exports = React.createClass({
  options: function() {
    return this.state.countries;
  },
  render: function() {
    return (
      <div>
        <div className="row page-header">
          <Header />
        </div>
        <div className="row">
          <div className="col-md-8 keyword-search">
            <p className="text-muted">Search by Keyword</p>
           <Keyword keyword={ this.props.keyword } onSearch={ this.props.onSearch } onChange={ this.props.onKeywordChange } />
          </div>
          <div className="col-md-4 category-search">
            <p className="text-muted">Search by Category</p>
            <IndustrySelect value={ this.props.industries } onChange={ this.props.onIndustryChange } />
            <p>And</p>
            <CountrySelect value={ this.props.countries } onChange={ this.props.onCountryChange } />
          </div>
        </div>
      </div>
    );
  }
});
