import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    search: function(q, countriesSelection, industriesSelection, page) {
      this.transitionTo('articles.results', {queryParams: {q: q, countries: countriesSelection, industries: industriesSelection, page: page}});
    }
  }
});
