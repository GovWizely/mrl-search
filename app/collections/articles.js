var $         = require('jquery');
var _         = require('lodash');
var Backbone  = require('backbone');
var Paginator = require('backbone.paginator');

var Article   = require('../models/article');

module.exports = Backbone.PageableCollection.extend({
  model: Article,
  url: 'https://pluto.kerits.org/v1/articles/search',
  defaultParams: {
    q: 'And'
  },
  params: {},
  parse: function(response) {
    return response.results;
  },
  state: {
    currentPage: 0,
    pageSize: 10
  },
  queryParams: {
    currentPage: 0,
    offset: function() {
      return this.state.currentPage * this.state.pageSize;
    },
    totalPages: 'total'
  },
  fetch: function(options) {
    this.trigger('fetch');
    options.data = options.data || {};
    if (!options.data.q) {
      options.data.q = 'And';
    }
    return Backbone.Collection.prototype.fetch.call(this, options);
  }
});
