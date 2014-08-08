import CubeComponent from './cube';

export default CubeComponent.extend({
  classNames: ['flat'],

  /*
  NOTE: if only there was a way to have access to a counter
  in the eachHelper, this would be much simpler. I wouldn't have to 
  munge the data into multiple arrays and have the views do
  extra work.
  */
  unflattenCubies: function(previousValue, cubie, index, cubies) {
    var row = cubies.slice(0, 3);
    previousValue.push(row);
    //hack to reduce the size of the iterator
    cubies.splice(0, 3);
    return previousValue;
  },

  //TODO: these could be curried (or something)
  topCubies: function() {
    return this.get('cubies').filter(function(cubie, index) { 
      return this.layerFromIndex(index) === 1;
    }, this).reduce(this.unflattenCubies,[]);
  }.property('cubies[]'),

  leftCubies: function() {
    return this.get('cubies').filter(function(cubie, index) { 
      return this.cubieFromIndex(index) === 1;
    }, this).reduce(this.unflattenCubies,[]);
  }.property('cubies[]'),

  backCubies: function() {
    return this.get('cubies').filter(function(cubie, index) { 
      return this.sectionFromIndex(index) === 1;
    }, this).reduce(this.unflattenCubies,[]);
  }.property('cubies[]'),

  rightCubies: function() {
    return this.get('cubies').filter(function(cubie, index) { 
      return this.cubieFromIndex(index) === 3;
    }, this).reduce(this.unflattenCubies,[]);
  }.property('cubies[]'),

  frontCubies: function() {
    return this.get('cubies').filter(function(cubie, index) { 
      return this.sectionFromIndex(index) === 3;
    }, this).reduce(this.unflattenCubies,[]);
  }.property('cubies[]'),

  bottomCubies: function() {
    return this.get('cubies').filter(function(cubie, index) { 
      return this.layerFromIndex(index) === 3;
    }, this).reduce(this.unflattenCubies,[]);
  }.property('cubies[]')
});