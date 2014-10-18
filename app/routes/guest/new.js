import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var guestPlayer = this.store.createRecord('player', {
      created: new Date(),
      isGuest: 'true'
    }).save();

    return guestPlayer;
  },
  afterModel: function(player, transition) {
    this.replaceWith('games.new', player);
  }
});
