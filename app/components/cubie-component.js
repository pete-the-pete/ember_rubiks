var computed = Ember.computed;

var CubieComponent = Ember.Component.extend({
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
    return this.get('active');
  }.property('active'),

  /**
  Register the cubie with its parent
  Thanks ic-tabs! https://github.com/instructure/ic-tabs/blob/master/lib/tab-list.js
  */
  registerWithSection: function() {
    this.get('section').registerCubie(this);
  }.on('didInsertElement'),


  /**
  A single cubie can be active at a time, so this checks
  its parent to see if it is the active cubie.
  */
  active: function() {
    if(this.get('cube.activeCubie') === this) {
      Ember.run.schedule('afterRender', this, function() {
        this.$().attr({ tabindex: 1 });
        this.$().focus();
      });
      return true;
    } else {
      return false;
    }
  }.property('cube.activeCubie'),

  index: function() {
    return this.get('section.cubieViews').indexOf(this);
  }.property('section.cubieViews.@each'),

  /**
  Let's the user navigate around the cube
  */
  keyDown: function(e) {
    if(!e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      this.get('cube').send('navigate', {
        cubieView: this,
        cubie: this.cubie,
        key: e.keyCode
      });
    }
  }

});

export default CubieComponent;