import { FACES } from '../constants';
import { KEYS } from '../constants';

export default Ember.Component.extend({
  //how many times has the layr been rotated in a direction
  step: 0,
  //observe the parent...component, if possible, and activate things based on what happens
  cube: Ember.computed.alias('parentView'),

  activeSection: null,

  active: function() {
    return this.get('cube.activeLayer') === this;
  }.property('cube.activeLayer'),

  removeLargerSteps: function(step) {},

  rotateLeft: function() {
    var nextStep = this.get('step') + 1;
    this.$().addClass('rotateY clockwise');
    this.$().addClass('step-'+nextStep);

    this.set('step', nextStep);
  },

  rotateRight: function() {

  },

  //handle rotation events, and rebroadcast them
  keyDown: function(e) {
    console.group('layerComponent');
    var activeRow = this.get('activeRow'),
      activeCol = this.get('activeCol');

    if(e.shiftKey) {
      //moves; layers can only rotate along the Y axis
      switch(e.keyCode) {
        case KEYS.LEFT:
          this.rotateLeft();
        case KEYS.RIGHT:
          this.rotateRight();
        break;
      }
    }
    console.groupEnd();
  }
});