import Ember from 'ember';
import FACES from '../constants';

export default Ember.Component.extend({
  ALL_FACES: FACES,

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