export default Ember.Component.extend({
  totalCubies: 3, //hardcode for now
  insertedCubies: 0,
  cube: Ember.computed.alias('parentView.parentView`'),
  layer: Ember.computed.alias('parentView')

  /*cubieInserted: function() {
    this.incrementProperty('insertedCubies');
    if(this.get('insertedCubies') === this.get('totalCubies') - 1) {
      this.set('insertedCubies', 0);
//      this.get('layer').sectionInserted();
    }
  }*/
});