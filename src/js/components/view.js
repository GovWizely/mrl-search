var $             = require('jquery');
var _             = require('lodash');
var Backbone      = require('backbone');
var BackboneReact = require('backbone-react-component');
var React         = require('react');

var SearchView    = require('./search-view');
var ResultView    = require('./result-view');

var Articles      = require('../collections/articles');

module.exports = React.createClass({
  transition: function() {
    this.handleCountryChange(this.props.router.params.countries);
    this.handleIndustryChange(this.props.router.params.industries);
    this.setState({
      keyword    : this.props.router.params.q,
      page       : this.props.router.params.page
    });
    var data = {
      q: this.props.router.params.q
    };
    if (this.props.router.params.industries) {
      data.industries = this.props.router.params.industries;
    }
    if (this.props.router.params.countries) {
      data.countries = this.props.router.params.countries;
    }
    if (this.props.router.params.page) {
      data.offset = this.props.router.params.page * this.state.pageSize;
    }
    this.state.articles.fetch({ data: data, reset: true });
  },
  componentWillMount : function() {
    this.callback = (function() {
      if (this.props.router.current == 'result-view') {
        this.transition();
      }
      this.forceUpdate();
    }).bind(this);
    this.props.router.on("route", this.callback);
  },
  componentWillUnmount : function() {
    this.props.router.off("route", this.callback);
  },
  getInitialState: function() {
    return {
      keyword: '',
      page: 0,
      countries: [],
      industries: [],
      articles: new Articles()
    };
  },
  handleSearch: function(e) {
    if (e.type ==='keydown' && e.which !== 13) {
      return;
    }

    var query = { q: this.state.keyword.trim() };
    if (this.state.countries.length) {
      query.countries = this.state.countries;
    }
    if (this.state.industries.length) {
      query.industries = this.state.industries;
    }
    if (this.state.page) {
      query.page = this.state.page;
    }
    this.props.router.navigate("search?" + $.param(query), { trigger: true });
  },
  handleKeywordChange: function(e) {
    this.setState({ keyword: e.target.value });
  },
  handleCountryChange: function(countries, __) {
    if (countries) {
      this.setState({ countries: _.compact(countries.split(',')) });
    } else {
      this.setState({ countries: [] });
    }
  },
  handleIndustryChange: function(industries, __) {
    if (industries) {
      this.setState({ industries: _.compact(industries.split(',')) });
    } else {
      this.setState({ industries: [] });
    }
  },
  currentView: function() {
    var props = {
      router: this.props.router,
      keyword: this.state.keyword,
      countries: this.state.countries,
      industries: this.state.industries,
      onKeywordChange: this.handleKeywordChange,
      onCountryChange: this.handleCountryChange,
      onIndustryChange: this.handleIndustryChange,
      onSearch: this.handleSearch
    };
    if(this.props.router.current == "result-view") {
      return <ResultView {...props} articles={ this.state.articles } />;
    }
    return <SearchView {...props} />;
  },
  render: function() {
    // search
    return (
      <div>
        { this.currentView() }
      </div>
    );
  }
});
