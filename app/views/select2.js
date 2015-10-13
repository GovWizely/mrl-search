import Ember from 'ember';

export default Ember.Select.extend({
  placeholder: '',

  didInsertElement: function() {
    this._super();
    this.select2ify();
  },

  didSelectionChange: function() {
    this.select2ify();
  }.observes('selection'),

  select2ify: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      $('#'+this.get('elementId')).select2({
        width: '100%', placeholder: this.get('placeholder')
      });
    });
  }
});
