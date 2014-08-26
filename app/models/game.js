import DS from 'ember-data';

var Game = DS.Model.extend({
  title: DS.attr('string'),
  moves: DS.hasMany('move')
});

export default Game;