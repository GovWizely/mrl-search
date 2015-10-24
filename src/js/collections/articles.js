var _         = require('lodash');
var Backbone  = require('backbone');

var Article   = require('../models/article');

module.exports = Backbone.Collection.extend({
  model: Article,
  url: 'https://pluto.kerits.org/v1/articles/search',
  parse: function(response) {
    this.metadata = response.metadata;
    this.aggregations.industries = this.parseIndustries(response.aggregations.industries);
    return response.results;
  },
  parseIndustries: function(results) {
    var industries = {};
    var subdivide = function(x, items) {
      var key = x.shift();
      items[key] = items[key] || {};

      if (x.length) { return subdivide(x, items[key]); }

      return items;
    };
    _.each(results, function(result) {
      var x = result.key.substring(1).split('/');
      subdivide(x, industries);
    });
    return industries;
  },
  aggregations: {},
  metadata: {},
  industries: {},
  fetch: function(options) {
    this.trigger('fetch');
    options.data = options.data || {};
    if (!options.data.q) {
      options.data.q = 'And';
    }
    return Backbone.Collection.prototype.fetch.call(this, options);
  }
});
