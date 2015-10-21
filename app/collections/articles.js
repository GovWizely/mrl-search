var Article = require('../models/article');
var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  model: Article,
  url: 'https://pluto.kerits.org/v1/articles/search',
  parse: function(response) {
    return response.results;
  }
});
