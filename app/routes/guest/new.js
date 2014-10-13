import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var guestPlayer = this.store.createRecord('player').save();
    return guestPlayer;
  },
  afterModel: function(guest, transition) {
    //create the new game since we need to pass it along
    this.store.createRecord('game').save().then(function(game) {
      this.transitionTo('game', guest, game);
    }.bind(this));
  }
});
