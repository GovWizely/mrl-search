var $     = require('jquery');
var _     = require('lodash');
var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      maxRange: 10
    };
  },
  createPage: function(i, isActive) {
    return (
        <li key={ i } className={ isActive ? 'active' : '' }><a href="3" onClick={ this.onNavigate.bind(this, i) }>{ i }</a></li>
    );
  },
  createPageRange: function() {
    var totalPages = Math.ceil(this.props.metadata.total / this.props.metadata.count);
    var pages = [];
    var currentPage = (this.props.metadata.offset / this.props.metadata.count) + 1;
    for (var i = 1; i <= this.props.maxRange && i <= totalPages; ++i) {
      pages.push(this.createPage(i, currentPage === i));
    }
    return pages;
  },
  onNavigate: function(i, e) {
    var params = _.clone(this.props.router.params);
    this.props.router.navigate("search?" + $.param(this.props.router.params), { trigger: true });
  },
  render: function() {
    return (
      <nav>
        <ul className="pagination" onClick={ this.onNavigate }>
          <li onClick={ this.onNavigate }><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
            { this.createPageRange() }
          <li><a href="#" aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>
        </ul>
      </nav>
    );
  }
});
