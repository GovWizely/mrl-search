var $     = require('jquery');
var _     = require('lodash');
var React = require('react');

var ArticleActor = require('../actors/article-actor');
var ArticleStore = require('../stores/article-store');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filters: ArticleStore.getFilters()
    };
  },
  createIndustryFilter: function(list, facet, index) {
    return (
      <li className="list-group-item checkbox" key={ facet }>
        <label><input name="industry-filter" type="checkbox" value={ facet } />{ facet }</label>
        { this.createList(list[facet], this.createIndustryFilter) }
      </li>
    );
  },
  createList: function(list, callback) {
    if (_.isEmpty(list)) return null;

    return (
      <ul className="list-group">
        { _.keys(list).map(callback.bind(null, list)) }
      </ul>
    );
  },
  onFilter: function(e) {
    var filters = {};
    if (e.target.name === 'industry-filter') {
      filters.industries = _.map($('#filters input:checked'), function(checked) {
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
        { this.createList(this.state.filters.industries, this.createIndustryFilter) }
      </div>
    );
  }
});
