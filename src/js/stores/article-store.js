var _       = require('lodash');
var assign  = require('object-assign');
var request = require('axios');

var Dispatcher  = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Store       = require('./store');
//var parser      = require('../utils/aggregation-parser');

var ENDPOINT = 'https://api.govwizely.com/market_research_library/search?api_key=0ooVzDG3pxt0azCL9uUBMYLS';

var _articles     = {},
    _aggregations = {},
    _metadata     = {},
    _query        = {};

var _setMetadata = function(_total, _offset) {
  _metadata = {total:_total, offset:_offset};
};

var _setArticles = function(articles) {
  _articles = articles;
};

var _setAggregations = function(aggregations) {
  _aggregations.countries  = _.reduce(aggregations.countries, function(results, country, key) {
    results[country.key] = country.key;
    return results;
  }, {});
  _aggregations.industries = parser.parseAsTree(aggregations.industries);
};

var _setQuery = function(query) {
  _query = query;
};

var ArticleStore = function(dispatcher) {
  Store.call(this, dispatcher);
};

ArticleStore.prototype = assign({}, Store.prototype, {

  getArticles: function() {
    return _.clone(_articles);
  },

  getAggregations: function() {
    return _.clone(_aggregations);
  },

  getMetadata: function() {
    return _.clone(_metadata);
  },

  getQuery: function() {
    return _.clone(_query);
  },

  __onDispatch: function(action) {
    switch(action.type) {
    case ActionTypes.SEARCH:
      if (_.isEmpty(action.query)) return null;

      _setQuery(action.query);
      return request
        .get(ENDPOINT, {
          params: _query
        })
        .then(function(response) {
          _setArticles(response.data.results);
          _setMetadata(response.data.total, response.data.offset);
          //_setAggregations(response.data.aggregations);

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

          this.__emitChange();
        }.bind(this));

    default:
      return null;
    }
  }
});

ArticleStore.prototype.constructor = ArticleStore;

var store = new ArticleStore(Dispatcher);
module.exports = store;
