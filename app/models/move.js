import DS from 'ember-data';

/**
 * The moves are individual objecs that describe the
 * the transition and state of a cube.
 *
 * The cubies attribute is a serialized version of the
 * cubies for the given game.
 *
 * The cube isn't kept as a reference so that a player
 * could follow different branches of moves (potentially)
 */
export default DS.Model.extend({
  timestamp: DS.attr('date'),
  direction: DS.attr('string'),
  axis: DS.attr('string'),
  type: DS.attr('string'),
  cubies: DS.attr(),
  positionData: DS.attr(),
  parentMove: DS.attr(),
  cube: DS.belongsTo('cube')
});