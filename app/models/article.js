import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  snippet: DS.attr('string'),
  url: DS.attr('string'),
  industries: DS.attr('array'),

  searchResultHeader: function() {
    return this.get('title');
  }.property('title')
});
