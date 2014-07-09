export default Ember.Component.extend({
  cube: Ember.computed.alias('parentView.parentView`'),
  layer: Ember.computed.alias('parentView')
});