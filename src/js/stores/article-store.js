var _       = require('lodash');
var assign  = require('object-assign');
var request = require('axios');

var Dispatcher  = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Store       = require('./store');
var parser      = require('../utils/aggregation-parser')l

var ENDPOINT = 'https://pluto.kerits.org/v1/articles/search';

var _articles = {},
    _filters = {},
    _query = {};

var _setArticles = function(articles) {
  _articles = articles;
};

var _setFilters = function(filters) {
  _filters.countries  = filters.countries;
  _filters.industries = parser.parseAsTree(filters.industries);
  _filters.topics     = parser.parseAsTree(filters.topics);
};

var _setQuery = function(query) {
  _query = query;
};

var ArticleStore = function(dispatcher) {
  Store.call(this, dispatcher);
};

ArticleStore.prototype = assign({}, Store.prototype, {

  getArticles: function() {
    return _articles;
  },

  getFilters: function() {
    return _filters;
  },

  getQuery: function() {
    return _query;
  },

  __onDispatch: function(action) {
    switch(action.type) {
    case ActionTypes.SEARCH:
      _setQuery(action.query);
      return request
        .get(ENDPOINT, {
          params: _query
        })
        .then(function(response) {
          _setArticles(response.data.results);
          _setFilters(response.data.aggregations);

          this.__emitChange();
        }.bind(this))
        .catch(function(response) {
          console.log(response);
        });

    case ActionTypes.FILTER:
      return request
        .get(ENDPOINT, {
          params: assign({}, _query, { industries: action.filters.industries })
        })
        .then(function(response) {
          _setArticles(response.data.results);
          this.__emitChange();
        }.bind(this))
        .catch(function(response) {
          console.log(response);
        });

    case ActionTypes.PAGING:
      return request
        .get(ENDPOINT, { params: assign({}, _query, { offset: 0 })})
        .then(function(response) {
          _setArticles(response.data.results);
        }.bind(this));

    default:
      return null;
    }
  }
});

ArticleStore.prototype.constructor = ArticleStore;

var store = new ArticleStore(Dispatcher);
module.exports = store;
