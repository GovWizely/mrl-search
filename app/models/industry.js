var Backbone = require('backbone');
var BackboneRelational = require('backbone-relational');

module.exports = Backbone.RelationalModel.extend({
  defaults: {
    name: ''
  }
});
