import DS from 'ember-data';

var Game = DS.Model.extend({
  title: DS.attr('string'),
  cube: DS.belongsTo('cube'),
  player: DS.belongsTo('player')
});

export default Game;