export default Ember.Route.extend({
  model: function() {
    "use strict";
    this.store.find('cube');
  }
});
