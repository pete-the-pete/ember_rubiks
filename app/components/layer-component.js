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

  resetRotations: function() {
    var steps = this.get('steps').length;
    if(steps % 4 === 0) {
      Ember.run.next(this, function() {
        this.set('direction', null);
        this.set('steps',[]);
      });
    }
  },

  //NOTE: updating the model might make this simpler, and
  //get rid of the need to know more than one step
  //if the model update/rerender is too slow, this will need to work
  rotateLeft: function() {
    if(this.$().hasClass('anticlockwise')) {
      //we were going the other way, so we should
      //unwinde that direction by one
      this.get('steps').popObject();
    } else {
      this.set('direction', 'clockwise');
      this.get('steps').pushObject('step');
    }
  },

  rotateRight: function() {
    if(this.$().hasClass('clockwise')) {
      //we were going the other way, so we should
      //unwinde that direction by one
      this.get('steps').popObject();
    } else {
      this.set('direction', 'anticlockwise');
      this.get('steps').pushObject('step');

    }
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
      this.resetRotations();
    }
  }
});