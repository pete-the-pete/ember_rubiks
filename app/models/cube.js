import DS from 'ember-data';

var Cube = DS.Model.extend({
  title: DS.attr('string'),
  game: DS.belongsTo('game'),
  cubies: DS.hasMany('cubie', {async: true}),
  isSolved: DS.attr('boolean', {defaultValue: false}),
  moves: DS.hasMany('move')
});

//pre-calc the cubies
var CUBE_CUBIES = (function() {
  var cubies = [];
  for(var i=1; i<=27; i++) {
    cubies.pushObject(i);
  }
  return cubies;
})();

Cube.reopenClass({
  FIXTURES: [
      {
        id: 1,
        isSolved: false,
        cubies: CUBE_CUBIES,
        moves: []
      }
    ]
  });
export default Cube;