var Backbone = require('backbone');
var Articles = require('../collections/articles');

module.exports = Backbone.Model.extend({
  initialize: function() {
    this.count = -1;
    this.keyword = '';
    this.articles = new Articles();
    this.articles.on('reset', function() {
      this.count = this.articles.length;
    }.bind(this));
  }
});
