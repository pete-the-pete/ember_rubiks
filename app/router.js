import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmberClientENV.locationType
});

Router.map(function() {
  this.resource('player', { path: 'players/:player_id' });
});

export default Router;
