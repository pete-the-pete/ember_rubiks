export default Ember.Component.extend({
  totalCubies: 3, //hardcode for now
  insertedCubies: 0,
  cube: Ember.computed.alias('parentView.parentView`'),
  layer: Ember.computed.alias('parentView'),

  init: function() {
    Ember.run.later(this, function() {
      try {
        this.rerender()
      } catch (e) {
        console.debug(e);
      }
    }, 2000);
    this._super();
  }

  /*cubieInserted: function() {
    this.incrementProperty('insertedCubies');
    if(this.get('insertedCubies') === this.get('totalCubies') - 1) {
      this.set('insertedCubies', 0);
//      this.get('layer').sectionInserted();
    }
  }*/
});