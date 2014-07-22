import { KEYS, ROTATION_DIRECTIONS, AXES } from '../constants';

export default Ember.Component.extend({
  classNames: 'section',
  classNameBindings: ['rotationAxis', 'rotationDirection','rotationSteps'],

  axis: null,
  steps: [],
  direction: null,

  cube: Ember.computed.alias('parentView.parentView'),
  layer: Ember.computed.alias('parentView'),

  index: function() {
    return this.get('layer.childViews').indexOf(this);
  }.property('layer.childViews.@each'),

  rotationAxis: function() {
    return 'rotate'+this.get('axis');
  }.property('axis'),

  rotationDirection: function() {
    return this.get('direction');
  }.property('direction'),

  rotationSteps: function() {
    return this.get('steps').join('');
  }.property('steps.[]'),

  sendMove: function() {
    console.debug(this);
    this.get('cube').send('move', {
      sectionView: this,
      section: this.section,
      sectionIndex: this.get('index'),
      cubeView: this.get('cube'),
      cube: this.get('cube').cube,
      direction: this.get('direction'),
      axis: this.get('axis'),
    });
  },

  /**
  Rotate the cube's sections around the Z or X axis
  */
  keyDown: function(e) {
    var move = false;
    if(!e.shiftKey && e.ctrlKey) {
      switch(e.keyCode) {
        case KEYS.LEFT:
          move = true;
          this.set('axis', AXES.Z);
          this.set('direction', ROTATION_DIRECTIONS.CLOCKWISE);
          break;
        case KEYS.RIGHT:
          move = true;
          this.set('axis', AXES.Z);
          this.set('direction', ROTATION_DIRECTIONS.ANTICLOCKWISE);
          break;
        case KEYS.UP:
          move = true;
          this.set('axis', AXES.X);
          this.set('direction', ROTATION_DIRECTIONS.CLOCKWISE);
          break;
        case KEYS.DOWN:
          move = true;
          this.set('axis', AXES.X);
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