var $     = require('jquery');
var _     = require('lodash');
var Immutable = require('immutable');
var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      pagination: {
        current : 1,
        total   : 1,
        size    : 10,
        range   : 10,
        url     : function(i) { return i; }
      }
    };
  },
  pages: function() {
    if (this.props.pagination.total <= this.props.pagination.range) {
      return _.range(1, this.props.pagination.total + 1);
    }
    var pivot = Math.ceil((this.props.pagination.range + 1) / 2);
    var head = this.props.pagination.current - pivot + 1;
    var tail = this.props.pagination.current + this.props.pagination.range;
    return _.chain(_.range(head, tail))
      .filter(function(x) { return x > 0})
      .take(this.props.pagination.range)
      .value();
  },
  previousPage: function() {
    return this.props.pagination.current - 1 || 1;
  },
  nextPage: function() {
    if (this.props.pagination.current === this.props.pagination.total) {
      return this.props.pagination.total;
    }
    return this.props.pagination.current + 1;
  },
  createPage: function(i, isActive) {
    return (
      <li key={ i } className={ isActive ? 'active' : '' }>
        <a href={ this.props.pagination.url(i) }>{ i }</a>
      </li>
    );
  },
  createPageRange: function() {
    var pages = [];
    _.forEach(this.pages(), function(i) {
      pages.push(this.createPage(i, this.props.pagination.current === i));
    }.bind(this));
    return pages;
  },
  render: function() {
    return (
      <nav>
        <ul className="pagination">
          <li>
            <a href={ this.props.pagination.url(1) } aria-label="First" className="fa fa-angle-double-left"></a>
          </li>
          <li>
            <a href={ this.props.pagination.url(this.previousPage()) } aria-label="Previous" className="fa fa-angle-left"></a>
          </li>
          { this.createPageRange() }
          <li>
            <a href={ this.props.pagination.url(this.nextPage()) } aria-label="Next" className="fa fa-angle-right"></a>
          </li>
          <li>
            <a href={ this.props.pagination.url(this.props.pagination.total) } aria-label="Last" className="fa fa-angle-double-right"></a>
          </li>
        </ul>
      </nav>
    );
  }
});
