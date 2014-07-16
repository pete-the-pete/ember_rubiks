import { KEYS, ROTATION_DIRECTIONS } from '../constants';

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
    return '';//this.get('steps').join('');
  }.property('steps.[]'),

  /**
  Actually have the move count towards the game
  */
  sendMove: function() {
    this.get('cube').send('move', {
      layer: this.layer,
      cube: this.get('cube'),
      direction: this.get('direction'),
      axis: 'Y',
    });
  },

  resetRotations: function() {
    if(this.get('steps').length % 4 === 0) {
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
    if(this.get('direction') === ROTATION_DIRECTIONS.CLOCKWISE) {
      //we were going the other way, so we should
      //unwinde that direction by one
      this.get('steps').popObject();
    } else {
      this.get('steps').pushObject('step');
    }
    this.set('direction', ROTATION_DIRECTIONS.ANTICLOCKWISE);
  },

  rotateRight: function() {
    if(this.get('direction') === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      //we were going the other way, so we should
      //unwinde that direction by one
      this.get('steps').popObject();
    } else {
      this.get('steps').pushObject('step');
    }
    this.set('direction', ROTATION_DIRECTIONS.CLOCKWISE);
  },

  //handle rotation events, and rebroadcast them
  keyDown: function(e) {
    if(e.shiftKey) {
      //moves; layers can only rotate along the Y axis
      switch(e.keyCode) {
        case KEYS.LEFT:
          this.rotateRight();
          this.sendMove();
          break;
        case KEYS.RIGHT:
          this.rotateLeft();
          this.sendMove();
          break;
      }
      this.resetRotations();
    }
  }
});