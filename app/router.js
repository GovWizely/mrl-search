import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ExplorerENV.locationType
});

Router.map(function() {
  this.resource('articles', function(){
    this.route('results');
  });
});

export default Router;
