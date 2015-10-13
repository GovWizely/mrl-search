import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    searchByIndustry: function(item) {
      this.sendAction('action', item);
    }
  }
});
