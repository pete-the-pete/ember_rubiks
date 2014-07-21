import { KEYS, ROTATION_DIRECTIONS, AXES } from '../constants';


export default Ember.Component.extend({
  classNames: ['layer', 'rotateY'],
  classNameBindings: ['rotationDirection','rotationSteps'],
  //how many times has the layer been rotated in a direction
  steps: [],
  direction: '',

  cube: Ember.computed.alias('parentView'),

  active: function() {
    return this.get('cube.activeLayer') === this;
  }.property('cube.activeLayer'),

  index: function() {
    return this.get('cube.childViews').indexOf(this);
  }.property('cube.childViews.@each'),

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
      layerView: this,
      layer: this.layer,
      cubeView: this.get('cube'),
      direction: this.get('direction'),
      axis: AXES.Y,
    });
  },

  /**
  Reset the data before inserting the updated layer.
  */
  willInsertElement: function() {
    this.set('direction', null);
    this.set('steps',[]);
  },

  //handle rotation events, and rebroadcast them
  keyDown: function(e) {
    var move = false;
    if(e.shiftKey) {
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
        this.get('steps').pushObject('step');
        Ember.run.later(this, this.sendMove, 250);
      }
    }
  }
});