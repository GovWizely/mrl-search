var Backbone = require('backbone');
var BackboneReact = require('backbone-react-component');
var React = require('react');
var Select = require('react-select');

var Header = require('./header');
var Countries = require('../collections/countries');
var Industries = require('../collections/industries');

var SearchBar = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function() {
    return {
      condensed: false
    };
  },
  keywordSearch: function() {
    return (
      <div className="col-md-8 keyword-search">
        <p className="text-muted">Search by Keyword</p>
        <div className="col-md-10 input-group">
          <input type="text" className="form-control input-lg" />
          <span className="input-group-btn">
            <button className="btn btn-success btn-lg" type="button">
              <i className="fa fa-search"></i>
            </button>
          </span>
        </div>
      </div>
    );
  },
  categorySearch: function() {
    return (
      <div className="col-md-4 category-search">
        <p className="text-muted">Search by Category</p>
        <Select name="industries" multi={ true }placeholder="Search Industries" options={ this.state.industries.map(function(industry) { return { label: industry.name, value: industry.name }; }) } />
        <p>And</p>
        <Select name="countries" multi={ true } placeholder="Search Countries" options={ this.state.countries } />
      </div>
    );
  },
  render: function() {
    var view = null;
    if (this.state.condensed) {

    } else {
      view = (
        <div>
          <div className="row page-header">
            <Header />
          </div>
          <div className="row">
            { this.keywordSearch() }
            { this.categorySearch() }
          </div>
        </div>
      );
    }
    return view;
  }
});

module.exports = React.createFactory(SearchBar);
