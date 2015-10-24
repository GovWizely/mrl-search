var Backbone = require('backbone');
var _ = require('lodash');

var Industry = require('../models/industry');

module.exports = Backbone.Collection.extend({
  model: Industry,
  url: 'https://pluto.kerits.org/v1/articles/count?q=and',
  parse: function(response) {
    return _.map(response.aggregations.industries, function(industry) {
      var x = industry.key.split('/');
      return new Industry( { name: x[x.length - 1], facet: x[0] } );
    });
  },
  initialize: function() {
    this.fetch({ reset: true});
  }
});
