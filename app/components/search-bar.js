import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    search: function(q) {
      if (q === undefined) {
        q = null;
      }
      var countries,
        industries,
        countriesField = this.get('countriesField'),
        industriesField = this.get('industriesField');
      if (countriesField.length) {
        countries = countriesField.map(function(item) {
          return item.value;
        });
      }
      if (industriesField.length) {
        industries = industriesField.map(function(item) {
          return item.value;
        });
      }
      this.sendAction('action', q, countries, industries, 1);
    }
  }
});
