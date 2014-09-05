import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('cube', 1);
  },
  renderTemplate: function(controller, model) {
    this.render('game', {controller:this.controllerFor('game.index')});
  },
  setupController: function(controller, model) {
    this.controllerFor('game.index').set('model', model);
  }
});
