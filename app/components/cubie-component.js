import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Component.extend({
  axis: null,
  steps: [],
  direction: null,
  _layerIndex: null,
  _sectionIndex: null,
  _cubieIndex: null,

  classNames: ['cubie'],
  classNameBindings: [
    'isActive',
    'positionClass',
    'rotationAxis',
    'rotationDirection',
    'rotationSteps'
  ],

  //cube
  cube: computed.alias('parentView'),

  willInsertElement: function() {
    //clear
    this.setProperties({
      'direction': null,
      'steps': []
    });
    this.updateClasses();
  },

  updateClasses: function() {
    var index = this.get('index'),
    CUBIE = ((index % 3)+1),
    LAYER = (Math.floor(index / 9)+1),
    SECTION = ((Math.floor(index / 3) % 3)+1);

    this.set('_layerIndex', LAYER);
    this.set('_sectionIndex', SECTION);
    this.set('_cubieIndex', CUBIE);
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

  /*
  Set the class based on the active state.
  */
  isActive: function() {
    return this.get('cube.activeCubie') === this;
  }.property('cube.activeCubie'),

  index: function() {
    return this.get('cube.cubies').indexOf(this.cubie);
  }.property(),

  /**
  A single cubie can be active at a time, so this checks
  the cube to see if it is the active cubie.
  */
  setFocus: function() {
    if(this.get('cube.activeCubie') === this) {
      Ember.run.schedule('afterRender', this, function() {
        this.$().attr({ tabindex: 1 });
        this.$().focus();
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