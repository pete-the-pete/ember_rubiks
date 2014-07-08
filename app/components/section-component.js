export default Ember.Component.extend({
  cube: Ember.computed.alias('cube'),
  layer: Ember.computed.alias('parentView'),

  activeCubie: null
});