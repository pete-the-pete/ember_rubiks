import { FACES } from '../constants';

var computed = Ember.computed;

var CubieComponent = Ember.Component.extend({
  classNameBindings: ['isActive'],

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
  displayFaces: computed.map('allFaces', function(f) {
    var f_copy = Ember.copy(f, true);
    var faces = this.cubie.get('data').faces;
    var found = faces.find(function(item) {
      return parseInt(item.id, 10) === parseInt(f_copy.id, 10);
    });
    if(found) {
      Ember.set(f_copy, 'facing','external');
    }
    return f_copy;
  }),

  /*
  Set the class based on the active state.
  */
  isActive: function() {
    return this.get('active');
  }.property('active'),


  /**
  A single cubie can be active at a time, so this checks
  its parent to see if it is the active cubie.
  */
  active: function() {
    return this.get('section.activeCubie') === this;
  }.property('section.activeCubie'),

  /**
  Adjacent cubies show the moves.
  NOTE: this is wrong, it needs to be updated to know which
  face is adjacent or active, not just the cubie
  */
  adjacent: function() {
    return this.get('section.adjacentCubies').contains(this);
  }.property('section.adjacentCubies.@each'),

  index: function() {
    return this.get('section.cubies').indexOf(this);
  }.property('section.cubies.@each'),

  /*
  After the element as been inserted (and rendered) set it to
  active based on the activeCubie of its parent.
  */
  didInsertElement: function() {
    Ember.run.schedule('afterRender', this, function() {
      if(this.get('active')) {
        this.$().attr({ tabindex: 1 });
        this.$().focus();
      }
    });
  },

  keyDown: function(e) {
    console.group('CubieComponent');
    var activeRow = this.get('activeRow'),
      activeCol = this.get('activeCol');

    if(e.shiftKey) {
      //moves
      console.log('sending the action');
      this.sendAction();
    } else {
      //changing the selection
      switch(e.keyCode) {
        case KEYS.UP:
          activeRow = (activeRow - 1 >= 0) ? --activeRow : 2;
          break;
        case KEYS.DOWN:
          activeRow = (activeRow + 1 <= 2) ? ++activeRow : 0;
          break;
        case KEYS.LEFT:
          activeCol = (activeCol - 1 >= 0) ? --activeCol : 2;
          break;
        case KEYS.RIGHT:
          activeCol = (activeCol + 1 <= 2) ? ++activeCol : 0;
          break;
      }
    }
    console.groupEnd();
  }
});

export default CubieComponent;