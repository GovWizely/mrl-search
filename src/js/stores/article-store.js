var _       = require('lodash');
var assign  = require('object-assign');
var request = require('axios');

var Dispatcher  = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Store       = require('./store');

var ENDPOINT = 'https://api.govwizely.com/market_research_library/search?api_key=0ooVzDG3pxt0azCL9uUBMYLS';

var _articles     = {},
    _metadata     = {},
    _query        = {},
    _actual_query_params = {};

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

var _setActualQuery = function(){
  _actual_query_params = _.clone(_query);

  if(_actual_query_params.expiration_date_start && _actual_query_params.expiration_date_end){
    _actual_query_params.expiration_date = _actual_query_params.expiration_date_start + " TO " + _actual_query_params.expiration_date_end;
    delete _actual_query_params.expiration_date_start;
    delete _actual_query_params.expiration_date_end;
  }
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
      _setActualQuery();

      console.log("_query:  " + JSON.stringify(_query));
      console.log("query_params:  " + JSON.stringify(_actual_query_params));

      return request
        .get(ENDPOINT, {
          params: _actual_query_params
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
        .get(ENDPOINT, { params: assign({}, _actual_query_params, { offset: 0 })})
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
