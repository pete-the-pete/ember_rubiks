export default Ember.Component.extend({
  classNames: 'section',

  cube: Ember.computed.alias('parentView.parentView`'),
  layer: Ember.computed.alias('parentView'),

  index: function() {
    return this.get('layer.childViews').indexOf(this);
  }.property('layer.childViews.@each'),
});