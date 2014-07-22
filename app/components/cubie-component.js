var computed = Ember.computed;

var CubieComponent = Ember.Component.extend({
  classNames: ['cubie'],
  classNameBindings: ['isActive'],

  //cube (probably kind of hacky)
  cube: computed.alias('parentView.parentView.parentView'),

  //the layer
  layer: computed.alias('parentView.parentView'),

  //the secion
  section: computed.alias('parentView'),

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
    return this.get('section.childViews').indexOf(this);
  }.property('section.childViews.@each'),

  /**
  Lets the user navigate around the cube
  */
  keyDown: function(e) {
    if(!e.shiftKey && !e.ctrlKey) {
      this.get('cube').send('navigate', {
        cubieView: this,
        cubie: this.cubie,
        key: e.keyCode
      });
    }
  }

});

export default CubieComponent;