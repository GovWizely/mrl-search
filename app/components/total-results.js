import Ember from 'ember';

export default Ember.Component.extend({
  totalText: function() {
    return (this.get('total') || 'No');
  }.property('total'),

  resultText: function() {
    return ((this.get('total') === 1) ? 'result was' : 'results were');
  }.property('total'),

  keyword: function() {
    return this.get('q');
  }.property('q'),

  hasKeyword: function() {
    var keyword = this.get('keyword');
    return (keyword && keyword.length > 0 && keyword !== 'And');
  }.property('keyword')
});
