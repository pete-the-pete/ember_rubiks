var computed = Ember.computed;

var LAYER = 1, SECTION = 1;

export default Ember.Component.extend({
  axis: null,
  steps: [],
  direction: null,
  _layerIndex: 1,
  _sectionIndex: 1,

  classNames: ['cubie'],
  classNameBindings: ['isActive', 'layer', 'section', 'rotationAxis', 'rotationDirection','rotationSteps'],

  //cube
  cube: computed.alias('parentView'),

  updateClasses: function() {
    var index = this.get('index');
    if(index > 0 && index % 9 === 0) {
      LAYER++;
    }
    this.set('_layerIndex', LAYER);
    if(index > 0 && index % 3 === 0) {
      SECTION = ((SECTION + 1) % 3) ? ++SECTION : 1;
    }
    this.set('_sectionIndex', SECTION);
  }.on('didInsertElement'),

  layer: function() {
    return 'layer'+this.get('_layerIndex');
  }.property('_layerIndex'),

  section: function() {
    return 'section'+this.get('_sectionIndex');
  }.property('_sectionIndex'),

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
  }.observes('isActive'),

  index: function() {
    return this.get('cube.childViews').indexOf(this);
  }.property('cube.childViews.@each'),

  /**
  Lets the user navigate around the cube
  */
  keyDown: function(e) {
    if(!e.shiftKey && !e.altKey) {
      this.get('cube').send('navigate', {
        cubieView: this,
        cubie: this.cubie,
        key: e.keyCode
      });
    }
  }
});