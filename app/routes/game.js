import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params, transition) {
    return this.store.findAll('game').then(function(g) {
      return g.findBy('id', params.game_id)
    });
  }
  
});
