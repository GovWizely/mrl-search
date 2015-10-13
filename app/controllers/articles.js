import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  queryParams: ['q', 'countries', 'industries', 'page'],

  q: null,
  qField: Ember.computed.oneWay('q'),

  countries: null,
  countriesField: function() {
    var sources = String(this.get('countries')).split(',');
    var selected = this.get('countryList').filter(function(item) {
      return sources.find(function(given) {
        return (item.value === given);
      });
    });
    return selected;
  }.property('countries'),

  industries: null,
  industriesField: function() {
    var industries = String(this.get('industries')).split(',');
    var selected = this.get('industryList').filter(function(item) {
      return industries.find(function(given) {
        return (item.value === given);
      });
    });
    return selected;
  }.property('industries'),

  page: 1,
  pageField: Ember.computed.oneWay('page'),

  industryList: function() {
    var list = [];
    this.get('model').content.forEach(function(facet) {
      list.push({value: facet.get('name'), label: facet.get('name')});
      facet.get('industries').content.forEach(function(industry) {
        list.push({value: industry.get('name'), label: industry.get('name')});
      });
    });
    return list;
  }.property('model'),

  countryList: [
    {label: 'Angola', value: 'Angola'},
    {label: 'Belgium', value: 'Belgium'},
    {label: 'Chile', value: 'Chile'},
    {label: 'Colombia', value: 'Colombia'},
    {label: 'Finland', value: 'Finland'},
    {label: 'France', value: 'France'},
    {label: 'Hungary', value: 'Hungary'},
    {label: 'Kuwait', value: 'Kuwait'},
    {label: 'Lebanon', value: 'Lebanon'},
    {label: 'Lesotho', value: 'Lesotho'},
    {label: 'Paraguay', value: 'Paraguay'},
    {label: 'Uzbekistan', value: 'Uzbekistan'},
  ],

  useCompactSearchBar: function() {
    return this.get('controllers.application.currentRouteName') !== 'articles.index';
  }.property('controllers.application.currentRouteName')
});
