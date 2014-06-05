import { FACES } from '../constants';

var CubieComponent = Ember.Component.extend({
  allFaces: FACES,
  displayFaces: Ember.computed.map('allFaces', function(f) {
    var f_copy = Ember.copy(f, true);
    var faces = this.cubie.get('data').faces;
    var found = faces.find(function(item) {
      return parseInt(item.id, 10) === parseInt(f_copy.id, 10);
    });
    if(found) {
      Ember.set(f_copy, 'facing','external');
    }
    return f_copy;
  }),
  classNameBindings: ['isActive'],
  isActive: function() {
    return this.cubie.get('data').isActive;
  }.property('cubie.isActive')
});

export default CubieComponent;