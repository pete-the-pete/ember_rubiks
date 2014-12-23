import DS from 'ember-data';

var Cube = DS.Model.extend({
  title: DS.attr('string'),
  game: DS.belongsTo('game'),
  isSolved: DS.attr('boolean', {defaultValue: false}),
  cubies: DS.hasMany('cubie', {inverse: 'cube', async: true}),
  moves: DS.hasMany('move', {inverse: 'cube', async: true}),
  moveCount: DS.attr('number', {defaultValue: 0})
});

export default Cube;