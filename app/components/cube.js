import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cube'],

  cubies: Ember.computed.alias('cube.data.cubies'),

  activeCubie: null,

  activeCubieIndex: null,

  //TODO: these should come from the model
  initialCubieIndex: 4,

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

  getXSiblings: function() {
    var index = this.get('activeCubie').get('positionData').cubie;
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

  getYSiblings: function() {
    var layer = this.get('activeCubie').get('positionData').layer;

    return this.get('childViews').filter(function(cubie) {
      return cubie.get('positionData').layer === layer;
    });
  },

  getZSiblings: function() {
    var section = this.get('activeCubie').get('positionData').section;

    return this.get('childViews').filter(function(cubie) {
      return cubie.get('positionData').section === section;
    });
  }
});