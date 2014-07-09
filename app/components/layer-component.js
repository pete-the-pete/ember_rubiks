import { KEYS } from '../constants';

export default Ember.Component.extend({
  //how many times has the layr been rotated in a direction
  steps: [],
  direction: '',
  classNameBindings: ['rotationDirection','rotationSteps'],

  cube: Ember.computed.alias('parentView'),

  active: function() {
    return this.get('cube.activeLayer') === this;
  }.property('cube.activeLayer'),

  rotationDirection: function() {
    return this.get('direction');
  }.property('direction'),

  rotationSteps: function() {
    var x = this.get('steps').join('');
    console.log(x);
    return x;
  }.property('steps.[]'),

  //NOTE: this isn't going to work and/or will be unnecessary
  //once it goes from 4 -> 1, it unwinds the animation
  //if the model update/rerender is too slow, it might work
  //by using key rames
  rotateLeft: function() {
    var currStep = this.get('steps').length,
      nextStep = ++currStep;

    if(this.$().hasClass('anticlockwise')) {
      //we were going the other way, so we should
      //unwinde that direction by one
      this.get('steps').popObject();
    } else {
      this.set('direction', 'clockwise');
      if(nextStep > 4) {
        this.set('steps',[]);
      }
      this.get('steps').pushObject('step');
    }
  },

  rotateRight: function() {

  },

  //handle rotation events, and rebroadcast them
  keyDown: function(e) {
    if(e.shiftKey) {
      //moves; layers can only rotate along the Y axis
      switch(e.keyCode) {
        case KEYS.LEFT:
          this.rotateLeft();
          break;
        case KEYS.RIGHT:
          this.rotateRight();
          break;
      }
    }
  }
});