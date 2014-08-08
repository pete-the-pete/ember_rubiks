import Ember from 'ember';
import FACES from '../constants';

export default Ember.Component.extend({
  ALL_FACES: FACES,

  classNames: ['cubie'],

  _layerIndex: null,
  _sectionIndex: null,
  _cubieIndex: null,

	//cube
  cube: Ember.computed.alias('parentView'),

  willInsertElement: function() {
    var index = this.get('index'),
    CUBIE = ((index % 3)+1),
    LAYER = (Math.floor(index / 9)+1),
    SECTION = ((Math.floor(index / 3) % 3)+1);

    this.set('_layerIndex', LAYER);
    this.set('_sectionIndex', SECTION);
    this.set('_cubieIndex', CUBIE);
  },

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