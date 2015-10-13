import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.find('facet');
  },

  queryParams: {
    q: { refreshModel: true },
    countries: { refreshModel: true },
    industries: { refreshModel: true },
    page: { refreshModel: true }
  },

  actions: {
    search: function(page) {
      var countries,
        industries,
        countriesField = this.controller.get('countriesField'),
        industriesField = this.controller.get('industriesField');

      if (countriesField) {
        countries = countriesField.map(function(item) {
          return item.value;
        });
      }
      this.controller.set('countries', countries);

      if (industriesField) {
        industries = industriesField.map(function(item) {
          return item.value;
        });
      }
      this.controller.set('industries', industries);

      this.controller.set('q', this.controller.get('qField'));
      this.controller.set('page', (page || 1));
    },

    searchByIndustry: function(industry) {
      var countries,
        industries = [industry],
        countriesField = this.controller.get('countriesField');

      if (countriesField) {
        countries = countriesField.map(function(item) {
          return item.value;
        });
      }

      this.controller.set('countries', countries);
      this.controller.set('industries', industries);

      this.controller.set('q', this.controller.get('qField'));
      this.controller.set('page', this.controller.get('page'));
    }

  }
});
