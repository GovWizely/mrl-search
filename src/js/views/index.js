var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '#main',
  initialize: function(options) {
    this.options = options || {};
  },
  component: function() {
    return null;
  },
  render: function() {
    React.renderComponent(this.component, this.el);
  }
});
