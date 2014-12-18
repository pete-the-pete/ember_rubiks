import Ember from 'ember';
import { FACES, FACES_INDECES } from '../constants';

export default Ember.Component.extend({
  ALL_FACES: FACES,
  FACES_INDECES: FACES_INDECES,
  classNames: ['cube'],
  axis: null,
  steps: [],
  direction: null,

  insertedChildView: 0,

  activeCubie: null,

  activeCubieIndex: null,

  //TODO: these should come from the model
  initialCubieIndex: 4,

  classNameBindings: [
    'positionClass',
    'rotationAxis',
    'rotationDirection',
    'rotationSteps'
  ],

  rotationAxis: function() {
    return 'rotate'+this.get('axis');
  }.property('axis'),

  rotationDirection: function() {
    return this.get('direction');
  }.property('direction'),

  rotationSteps: function() {
    return this.get('steps').join('');
  }.property('steps.[]'),

  //There's probably a better way to do this
  topFace: function() {
    return FACES[FACES_INDECES.TOP];
  }.property(),

  leftFace: function() {
    return FACES[FACES_INDECES.LEFT];
  }.property(),

  backFace: function() {
    return FACES[FACES_INDECES.BACK];
  }.property(),

  rightFace: function() {
    return FACES[FACES_INDECES.RIGHT];
  }.property(),

  frontFace: function() {
    return FACES[FACES_INDECES.FRONT];
  }.property(),

  bottomFace: function() {
    return FACES[FACES_INDECES.BOTTOM];
  }.property(),

  setActiveCubie: function(cubie) {
    this.set('activeCubie', cubie);
  },
  
  /**
  Sets the active cubie at the index of the active seciton
  */
  setActiveCubieAtIndex: function(index) {
    this.set('activeCubieIndex', index);
    this.set('activeCubie', this.get('childViews').objectAt(index));
  },

  getCubieAtIndex: function(index) {
    return this.get('childViews').objectAt(index);
  },

  layerFromIndex: function(index) {
    return (Math.floor(index / 9)+1);
  },

  sectionFromIndex: function(index) {
    return ((Math.floor(index / 3) % 3)+1);
  },

  cubieFromIndex: function(index) {
    return ((index % 3)+1);
  },

  getXSiblings: function(aCubie) {
    var index = aCubie.get('positionData').cubie;
    return this.get('childViews').filter(function(cubie) {
      var c_index = cubie.get('positionData').cubie;
      //brute force, return the cubie if it matches one of its nine siblings, including itself
      return c_index === index || //itself
        c_index === index + 3 || c_index === index - 3 || //next cubie over
        c_index === index + 6 || c_index === index - 6 || //two cubies over, or the next diagonal
        c_index === index + 9 || c_index === index - 9 || //one cubie above or below, or the next next diagonal
        c_index === index + 12 || c_index === index - 12 || //diagonal
        c_index === index + 15 || c_index === index - 15 || //diagonal
        c_index === index + 18 || c_index === index - 18 || //two above or below
        c_index === index + 21 || c_index === index - 21; //diagonal
    });
  },

  getYSiblings: function(aCubie) {
    var layer = aCubie.get('positionData').layer;

    return this.get('childViews').filter(function(cubie) {
      return cubie.get('positionData').layer === layer;
    });
  },

  getZSiblings: function(aCubie) {
    var section = aCubie.get('positionData').section;

    return this.get('childViews').filter(function(cubie) {
      return cubie.get('positionData').section === section;
    });
  }
});