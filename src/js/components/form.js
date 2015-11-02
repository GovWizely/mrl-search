var _     = require('lodash');
var $     = require('jquery');
var React = require('react');

var ExpandedForm     = require('./expanded-form');
var CondensedForm    = require('./condensed-form');
var ArticleActor     = require('../actors/article-actor');
var ArticleStore     = require('../stores/article-store');
var AggregationStore = require('../stores/aggregation-store');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      expanded : true
    };
  },
  getInitialState: function() {
    return {
      keyword      : ArticleStore.getQuery().q          || '',
      countries    : ArticleStore.getQuery().countries  || '',
      industries   : ArticleStore.getQuery().industries || '',
      topics       : ArticleStore.getQuery().topics     || '',
      aggregations : {}
    };
  },
  componentWillMount: function() {
    AggregationStore.getAll(function(aggregations) {
      this.setState({ aggregations: aggregations });
    }.bind(this));
  },
  handleSubmit: function(e) {
    var query = _.pick({
      q: this.state.keyword,
      countries: this.state.countries,
      industries: this.state.industries,
      topics: this.state.topics
    }, _.identity);

    this.props.history.pushState(
      query, '/search', query);
  },
  handleKeywordChange: function(e) {
    this.setState({ keyword: e.target.value });
  },
  handleCountryChange: function(values) {
    this.setState({ countries: values });
  },
  handleIndustryChange: function(values) {
    this.setState({ industries: values });
  },
  handleTopicChange: function(values) {
    this.setState({ topics: values });
  },
  view: function() {
    var props = {
      keyword          : this.state.keyword,
      countries        : this.state.countries,
      industries       : this.state.industries,
      topics           : this.state.topics,
      aggregations     : this.state.aggregations,
      onKeywordChange  : this.handleKeywordChange,
      onCountryChange  : this.handleCountryChange,
      onIndustryChange : this.handleIndustryChange,
      onSubmit         : this.handleSubmit
    };
    if (!this.props.expanded) {
      return <CondensedForm {...props} />;
    } else {
      return <ExpandedForm {...props} />;
    }
  },
  render: function() {
    return this.view();
  }
});
