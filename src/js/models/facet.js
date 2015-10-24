var Backbone = require('backbone');
var BackboneRelational = require('backbone-relational');

var Industry = require('./industry');
var Industries = require('../collections/industries');

module.exports = Backbone.RelationalModel.extend({
  defaults: {
    name: '',
    industries: []
  },
  relations: [{
    type: Backbone.HasMany,
    key: 'industries',
    relatedModel: 'Industry',
    collectionType: 'Industries',
    reverseRelation: {
      key: 'facet'
    }
  }]
});
