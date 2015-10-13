import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleBody: function() {
      this.toggleProperty('isShowingBody');
    },
    searchByIndustry: function(item) {
      this.sendAction('action', item);
    }
  }
});
