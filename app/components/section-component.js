export default Ember.Component.extend({
  cube: Ember.computed.alias('parentView.parentView`'),
  layer: Ember.computed.alias('parentView'),

  cubieViews: null,

  createCubies: function() {
    this.set('cubieViews', Ember.ArrayProxy.create({content: []}));
  }.on('init'),

  registerCubie: function(cubie) {
    this.get('cubieViews').pushObject(cubie);
  },

  registerWithLayer: function() {
    this.get('layer').registerSection(this);
  }.on('didInsertElement'),

  index: function() {
    return this.get('layer.sectionViews').indexOf(this);
  }.property('layer.sectionViews.@each'),
});