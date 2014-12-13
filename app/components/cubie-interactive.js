import Ember from 'ember';
import CubieComponent from './cubie';

export default CubieComponent.extend({
  axis: null,
  steps: [],
  direction: null,

  classNameBindings: [
    'isActive',
    'positionClass',
    'rotationAxis',
    'rotationDirection',
    'rotationSteps'
  ],

  willInsertElement: function() {
    this._super();
    //clear
    this.setProperties({
      'direction': null,
      'steps': []
    });
  },

  positionClass: function() {
    return ('layer-'+this.get('_layerIndex')) + ' ' +
           ('section-'+this.get('_sectionIndex')) + ' ' +
           ('cubie-'+this.get('_cubieIndex'));
  }.property('_cubieIndex'),

  positionData: function() {
    return {
      index: this.get('index'),
      layer: this.get('_layerIndex')-1,
      section: this.get('_sectionIndex')-1,
      cubie: this.get('_cubieIndex')-1
    };
  }.property(),

  rotationAxis: function() {
    return 'rotate'+this.get('axis');
  }.property('axis'),

  rotationDirection: function() {
    return this.get('direction');
  }.property('direction'),

  rotationSteps: function() {
    return this.get('steps').join('');
  }.property('steps.[]'),

  /**
  A single cubie can be active at a time, so this checks
  the cube to see if it is the active cubie.
  */
  setFocus: function() {
    if(this.get('cube.activeCubie') === this) {
      Ember.run.scheduleOnce('afterRender', this, function() {
        if(this.$() && this.$().attr) {
          this.$().attr({ tabindex: 1 });
          this.$().focus();
        }
      });
    }
  }.observes('cube.activeCubie'),

  /**
  Lets the user navigate around the cube
  */
  keyDown: function(e) {
    if(!e.shiftKey && !e.altKey) {
      this.get('cube').send('navigate', {
        key: e.keyCode
      });
    }
  }
});