import { KEYS, ROTATION_DIRECTIONS } from '../constants';

var INITIALIZED = false;

export default Ember.Component.extend({
  totalSections: 3, //hardcode for now
  insertedSections: 0,
  //how many times has the layr been rotated in a direction
  steps: [],
  direction: '',
  classNameBindings: ['rotationDirection','rotationSteps'],

  cube: Ember.computed.alias('parentView'),

  init: function() {
    Ember.run.later(this, function() {
      try {
        this.rerender();
        console.debug('rerendered');
      } catch (e) {
        console.debug(e);
      }
    }, 2000);
    this._super();
  },

/*  sectionInserted: function() {
    this.incrementProperty('insertedSections');
    if(this.get('insertedSections') === this.get('totalSections')) {
      this.set('insertedSections', 0);
      if(INITIALIZED) {
        //this.resetRotations();
      }
    }
  },*/

  active: function() {
    return this.get('cube.activeLayer') === this;
  }.property('cube.activeLayer'),

  rotationDirection: function() {
    return this.get('direction');
  }.property('direction'),

  rotationSteps: function() {
    return this.get('steps').join('');
  }.property('steps.[]'),

  /**
  Actually have the move count towards the game
  */
  sendMove: function() {
    this.get('cube').send('move', {
      layer: this.layer,
      cube: this.get('cube').cube,
      direction: this.get('direction'),
      axis: 'Y',
    });
  },

  rotate: function() {
    if(this.get('direction') === ROTATION_DIRECTIONS.CLOCKWISE) {
      this.rotateRight();
    } else if(this.get('direction') === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      this.rotateLeft();
    }
  },

  resetRotations: function() {
    console.debug('reset the rotations');
    //if(this.get('steps').length % 4 === 0) {
      //Ember.run.scheduleOnce('render', this, function() {
        //this.set('direction', null);
        //this.set('steps',[]);
        console.debug(this);
      //});
    //}
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
  },

  rotateRight: function() {
    if(this.get('direction') === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      //we were going the other way, so we should
      //unwinde that direction by one
      this.get('steps').popObject();
    } else {
      this.get('steps').pushObject('step');
    }
  },

  //handle rotation events, and rebroadcast them
  keyDown: function(e) {
    var move = false;
    if(e.shiftKey) {
      //moves; layers can only rotate along the Y axis
      switch(e.keyCode) {
        case KEYS.LEFT:
          move = true;
          this.set('direction', ROTATION_DIRECTIONS.CLOCKWISE);
          break;
        case KEYS.RIGHT:
          move = true;
          this.set('direction', ROTATION_DIRECTIONS.ANTICLOCKWISE);
          break;
      }
      if(move) {
        INITIALIZED = true;
        this.get('steps').pushObject('step');
        Ember.run.later(this, this.sendMove, 250);
      }
    }
  }
});