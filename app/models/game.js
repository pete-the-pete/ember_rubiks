import DS from 'ember-data';

var Game = DS.Model.extend({
  title: DS.attr('string'),
  cube: DS.belongsTo('cube', {async: true}),
  player: DS.belongsTo('player', {async: true})
});

export default Game;