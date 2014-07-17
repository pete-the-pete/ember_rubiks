import { FACES } from '../constants';

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
  Go through all the possible faces, and set the facing
  property based on the set of faces associated with a
  particular cubie.
  */
  allFaces: FACES,
 /* displayFaces: computed.map('allFaces', function(f) {
    var f_copy = Ember.copy(f, true);
    var faces = this.cubie.get('data').faces;
    var found = faces.find(function(item) {
      return parseInt(item.id, 10) === parseInt(f_copy.id, 10);
    });
    if(found) {
      Ember.set(f_copy, 'facing','external');
    }
    return f_copy;
  }),*/

  /*
  Set the class based on the active state.
  */
/*  isActive: function() {
    return this.get('active');
  }.property('active'),*/


  /**
  A single cubie can be active at a time, so this checks
  its parent to see if it is the active cubie.
  */
/*  active: function() {
    if(this.get('cube.activeCubie') === this.cubie) {
      this.$().attr({ tabindex: 1 });
      this.$().focus();
      return true;
    } else {
      return false;
    }
  }.property('cube.activeCubie'),*/

  /**
  Adjacent cubies show the moves.
  NOTE: this is wrong, it needs to be updated to know which
  face is adjacent or active, not just the cubie
  *
  adjacent: function() {
    return this.get('section.adjacentCubies').contains(this);
  }.property('section.adjacentCubies.@each'),
  */

  /*didInsertElement: function() {
    this.get('section').cubieInserted();
  },*/

  /*index: function() {
    return this.get('section.cubies').indexOf(this.cubie);
  }.property('section.cubies.@each')*/

});

export default CubieComponent;