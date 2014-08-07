import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['cubie'],

	//cube
  cube: Ember.computed.alias('parentView'),

  /*
  Set the class based on the active state.
  */
  isActive: function() {
    return this.get('cube.activeCubie') === this;
  }.property('cube.activeCubie'),

  index: function() {
    return this.get('cube.cubies').indexOf(this.cubie);
  }.property()

});