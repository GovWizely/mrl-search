var Backbone = require('backbone');
var _ = require('lodash');

var Facet = require('../models/facet');

module.exports = Backbone.Collection.extend({
  model: Facet,
  url: 'https://pluto.kerits.org/v1/articles/count?q=and',
  parse: function(response) {
    return _.map(response.aggregations.industries, function(industry) {
      return { };
    });
  },
  initialize: function() {
    this.fetch({ reset: true});
  }
});
