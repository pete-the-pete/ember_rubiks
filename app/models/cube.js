import DS from 'ember-data';

var Cube = DS.Model.extend({
  title: DS.attr('string'),
  cubies: DS.hasMany('cubie', {async: true}),
  isSolved: DS.attr('boolean', {defaultValue: false})
});

//pre-calc the cubies
var CUBE_CUBIES = (function() {
  var cubies = [];
  for(var i=1;i<=27;i++) {
    cubies.push(i);
  }
  return cubies;
})();

Cube.reopenClass({
  FIXTURES: [
      {
        id: 1,
        isSolved: false,
        cubies: CUBE_CUBIES
      }
    ]
  });
export default Cube;