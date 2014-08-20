import DS from 'ember-data';

var Game = DS.Model.extend({
  title: DS.attr('string'),
  moves: DS.attr()
});

export default Game;