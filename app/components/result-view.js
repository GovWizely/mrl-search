var Backbone       = require('backbone');
var BackboneReact  = require('backbone-react-component');
var React          = require('react');

var Header         = require('./header');
var Keyword        = require('./keyword-searchbox');
var CountrySelect  = require('./country-select');
var IndustrySelect = require('./industry-select');
var Filters        = require('./filters');
var Articles       = require('./articles');
var Messages       = require('./search-message');
var Pagination     = require('./pagination');

module.exports = React.createClass({
  componentWillMount: function() {
    this.fetchStarted = function() {
      this.setState({ loading: true });
    }.bind(this);
    this.props.articles.on('fetch', this.fetchStarted);

    this.fetchCompleted = function() {
      this.setState({ loading: false });
    }.bind(this);
    this.props.articles.on('sync', this.fetchCompleted);
  },
  componentWillUnmount: function() {
    this.props.articles.off('fetch', this.fetchStarted);
    this.props.articles.off('sync', this.fetchCompleted);
  },
  getInitialState: function() {
    return {
      loading: true
    };
  },
  onFilter: function(checked) {
    this.props.articles.fetch({
      data: {
        q          : this.props.router.params.q,
        page       : this.props.router.params.page,
        industries : checked.industries.join(',')
      },
      reset: true
    });
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Header condensed={ true } />
          </div>
          <div className="col-md-5">
            <Keyword keyword={ this.props.keyword } onSearch={ this.props.onSearch } onChange={ this.props.onKeywordChange } condensed={ true } />
          </div>
          <div className="col-md-2">
            <IndustrySelect value={ this.props.industries } onChange={ this.props.onIndustryChange } />
          </div>
          <div className="col-md-2">
            <CountrySelect value={ this.props.countries } onChange={ this.props.onCountryChange } />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-muted">Advance Options</h4>
            <Filters filters={ this.props.articles.aggregations } onFilter={ this.onFilter }/>
          </div>
          <div className="col-md-9">
            <Messages count={ this.props.articles.state.totalRecords } keyword={ this.props.router.params.q } />
            <Articles collection={ this.props.articles } />
            <Pagination metadata={ this.props.articles.metadata } router={ this.props.router }/>
          </div>
        </div>
      </div>
    );
  }
});
