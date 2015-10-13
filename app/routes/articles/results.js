import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params, transition) {

    var p = transition.queryParams;

    return this.store.find('article', {
      q: p.q,
      countries: p.countries,
      industries: p.industries,
      page: p.page,
    });
  },
  actions: {
    search: function(q, countriesSelection, industriesSelection, page) {
      this.transitionTo('articles.results', {queryParams: {q: q, countries: countriesSelection, industries: industriesSelection, page: page}});
    }
  }
});
