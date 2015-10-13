import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    click: function() {
      this.sendAction('action', this.get('item'));
    }
  }
});
