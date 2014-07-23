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
    return 'rotate' + this.get('axis');
  }.property('axis'),

  rotationDirection: function() {
    return this.get('direction');
  }.property('direction'),

  rotationSteps: function() {
    return this.get('steps').join('');
  }.property('steps.[]'),

  sendMove: function() {
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
  Reset the data before inserting the updated layer.
  */
  willInsertElement: function() {
    this.set('direction', null);
    this.set('steps',[]);
  },

  /**
  Rotate the cube's sections around the Z or X axis
  */
  keyDown: function(e) {
    var move = false;
    if(!e.shiftKey && e.altKey) {
      switch(e.keyCode) {
        case KEYS.LEFT:
          move = true;
          this.set('axis', AXES.Z);
          this.set('direction', ROTATION_DIRECTIONS.ANTICLOCKWISE);
          break;
        case KEYS.RIGHT:
          move = true;
          this.set('axis', AXES.Z);
          this.set('direction', ROTATION_DIRECTIONS.CLOCKWISE);
          break;
        case KEYS.UP:
          move = true;
          this.set('axis', AXES.X);
          this.set('direction', ROTATION_DIRECTIONS.ANTICLOCKWISE);
          break;
        case KEYS.DOWN:
          move = true;
          this.set('axis', AXES.X);
          this.set('direction', ROTATION_DIRECTIONS.CLOCKWISE);
          break;
      }
      if(move) {
        this.get('steps').pushObject('step');
        //TODO: clean this up
        this.get('cube').get('childViews').forEach(function(layer, l_index, layers) {
          layer.get('childViews').objectAt(this.get('index'))
            .get('childViews').forEach(function (cubie, c_index, cubies) {
              cubie.setProperties({
                axis: this.get('axis'),
                steps: this.get('steps'),
                direction: this.get('direction'),
              });
            }.bind(this));
        }.bind(this));
        Ember.run.later(this, this.sendMove, 250);
      }
    }
  }
});