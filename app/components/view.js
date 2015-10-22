var _             = require('lodash');
var Backbone      = require('backbone');
var BackboneReact = require('backbone-react-component');
var React         = require('react');

var Articles      = require('../collections/articles');
var Industries    = require('../collections/industries');
var countries     = require('../collections/countries');

var SearchView    = require('./search-view');
var ResultView    = require('./result-view');

module.exports = React.createClass({
  transition: function() {
    console.log(this.props.router.params);
    this.handleCountryChange(this.props.router.params.countries);
    this.handleIndustryChange(this.props.router.params.industries);
    this.setState({
      keyword    : this.props.router.params.q,
      page       : this.props.router.params.page
    });
    this.state.articles.fetch({
      data: this.props.router.params,
      reset: true
    });
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
      page: '',
      countries: [],
      industries: [],
      articles: new Articles()
    };
  },
  handleKeywordChange: function(e) {
    this.setState({ keyword: e.target.value });
  },
  handleKeywordSearch: function(e) {
    if (e.type ==='keydown' && e.which !== 13) {
      return;
    }
    var path = 'search?q=' + encodeURIComponent(this.state.keyword.trim());
    if (this.state.countries.length) {
      path = path.concat('&countries=' + _.map(this.state.countries, function(country) {
        return encodeURIComponent(country.trim());
      }).join(','));
    }
    if (this.state.industries.length) {
      path = path.concat('&industries=' + _.map(this.state.industries, function(industry) {
        return encodeURIComponent(industry.trim());
      }).join(','));
    }
    if (this.state.page) {
      path = path.concat('&page=' + this.state.page);
    }
    this.props.router.navigate(path, { trigger: true });
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
  handleCategorySearch: function() {
    this.props.router.navigate("search/" + this.state.keyword, { trigger: true });
  },
  currentView: function() {
    var props = {
      router: this.props.router,
      keyword: this.state.keyword,
      onKeywordChange: this.handleKeywordChange,
      onKeywordSearch: this.handleKeywordSearch,
      countries: this.state.countries,
      industries: this.state.industries,
      onCountryChange: this.handleCountryChange,
      onIndustryChange: this.handleIndustryChange,
      onCategorySearch: this.handleCategorySearch
    };
    if(this.props.router.current == "result-view") {
      return <ResultView {...props} collection={ this.state.articles } />;
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
