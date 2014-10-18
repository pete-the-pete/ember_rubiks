import DS from 'ember-data';

var Cube = DS.Model.extend({
  title: DS.attr('string'),
  game: DS.belongsTo('game'),
  cubies: DS.hasMany('cubie'),
  isSolved: DS.attr('boolean', {defaultValue: false}),
  moves: DS.hasMany('move')
});

export default Cube;