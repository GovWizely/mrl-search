var $     = require('jquery');
var _     = require('lodash');
var React = require('react');

var ArticleActor = require('../actors/article-actor');
var ArticleStore = require('../stores/article-store');

module.exports = React.createClass({
  _onChange: function() {
    this.setState({ filters: ArticleStore.getAggregations() });
  },
  getInitialState: function() {
    return {
      filters: ArticleStore.getAggregations()
    };
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  createNestedFilterOption: function(list, name, item, index) {
    return (
      <li className="list-group-item checkbox" key={ item }>
        <label><input name={ name } type="checkbox" value={ item } />{ item }</label>
        { this.createFilterList(list[item], name, this.createNestedFilterOption) }
      </li>
    );
  },
  createFilterOption: function(list, name, item, index) {
    return (
      <li className="list-group-item checkbox" key={ item }>
        <label><input name={ name } type="checkbox" value={ item } />{ item }</label>
      </li>
    );
  },
  createFilterList: function(list, name, callback) {
    if (_.isEmpty(list)) return null;
    return (
      <ul className="list-group">
        { _.keys(list).map(callback.bind(null, list, name)) }
      </ul>
    );
  },
  onFilter: function(e) {
    var filters = {};
    if (e.target.name === 'country-filter') {
      filters.countries = _.map($('#filters input:checked'), function(checked) {
        return checked.value;
      });
    }
    if (e.target.name === 'industry-filter') {
      filters.industries = _.map($('#filters input:checked'), function(checked) {
        return checked.value;
      });
    }
    if (e.target.name === 'topic-filter') {
      filters.topics = _.map($('#filters input:checked'), function(checked) {
        return checked.value;
      });
    }

    if (!_.isEmpty(filters)) {
      ArticleActor.filter(filters);
    }
  },
  render: function() {
    return (
      <div id="filters" onClick={ this.onFilter }>
        <section>
        <h5>Country</h5>
        <div className="overflow">
        { this.createFilterList(this.state.filters.countries, 'country-filter', this.createFilterOption) }
      </div>
        </section>
        <section>
        <h5>Industry</h5>
        <div className="overflow">
        { this.createFilterList(this.state.filters.industries, 'industry-filter', this.createNestedFilterOption) }
        </div>
        </section>
        <section>
        <h5>Topic</h5>
        <div className="overflow">
        { this.createFilterList(this.state.filters.topics, 'topic-filter', this.createNestedFilterOption) }
        </div>
        </section>
      </div>
    );
  }
});
