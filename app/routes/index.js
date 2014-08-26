import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    try {
      console.debug(this.store.find('game', 1));
    } catch(e) {
      console.debug('yep');
      return Ember.Object();
    }
  }
});
