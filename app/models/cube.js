import DS from 'ember-data';

var Cube = DS.Model.extend({
  title: DS.attr('string'),
  game: DS.belongsTo('game'),
  isSolved: DS.attr('boolean', {defaultValue: false}),
  cubies: DS.hasMany('cubie', {async: true}),
  moves: DS.hasMany('move', {async: true}),
  moveCount: DS.attr('number')
});

export default Cube;