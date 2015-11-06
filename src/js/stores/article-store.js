var _       = require('lodash');
var assign  = require('object-assign');
var request = require('axios');

var Dispatcher  = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Store       = require('./store');

var ENDPOINT = 'https://api.govwizely.com/market_research_library/search?api_key=0ooVzDG3pxt0azCL9uUBMYLS';

var _articles     = {},
    _metadata     = {},
    _query        = {};

var _setMetadata = function(_total, _offset) {
  _metadata = {total:_total, offset:_offset};
};

var _setArticles = function(articles) {
  _articles = articles;
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

  getMetadata: function() {
    return _.clone(_metadata);
  },

  getQuery: function() {
    return _.clone(_query);
  },

  __onDispatch: function(action) {
    switch(action.type) {
    case ActionTypes.SEARCH:

      _setQuery(action.query);

      
      var query_params = {};
      for(var propertyName in _query){
        query_params[propertyName] = _query[propertyName];
      }

      if(query_params.expiration_date_start && query_params.expiration_date_end){
        query_params.expiration_date = query_params.expiration_date_start + " TO " + query_params.expiration_date_end;
        delete query_params.expiration_date_start;
        delete query_params.expiration_date_end;
      }
      
      //console.log(String(query_params));
      console.log("_query:  " + JSON.stringify(_query));
      console.log("query_params:  " + JSON.stringify(query_params));

      return request
        .get(ENDPOINT, {
          params: query_params
          //params: _query
        })
        .then(function(response) {
          _setArticles(response.data.results);
          _setMetadata(response.data.total, response.data.offset);

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
