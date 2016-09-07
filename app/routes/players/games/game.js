import Ember from 'ember';

export default Ember.Route.extend({
  templateName: 'game',
  controllerName: 'game',
  model: function(params) {
    return this.store.findAll('game').then(function(g) {
      return g.findBy('id', params.game_id);
    });
  }

});
