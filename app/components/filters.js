var $     = require('jquery');
var _     = require('lodash');
var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      checked: []
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
    var checked = {};
    if (e.target.name === 'industry-filter') {
      checked.industries = _.map($('#filters input:checked'), function(checked) {
        return checked.value;
      });
    }
    if (!_.isEmpty(checked)) {
      console.log(checked);
      this.props.onFilter(checked);
    }
  },
  render: function() {
    return (
      <div id="filters" onClick={ this.onFilter }>
        { this.createList(this.props.filters.industries, this.createIndustryFilter) }
      </div>
    );
  }
});
