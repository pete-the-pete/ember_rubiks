import Ember from 'ember';
import CubieComponent from './cubie';

export default CubieComponent.extend({

  displayFace: Ember.computed.filter('faces', function(currFace) {
    return currFace.id === this.get('face_id');
  }),

  sideName: function() {
    var df = this.get('displayFace').get('firstObject');
    if(df) {
      return df.side;
    } else {
      return 'none';
    }
  }.property('faces'),

  sideColor: function() {
    var df = this.get('displayFace').get('firstObject');
    if(df) {
      return df.color;
    } else {
      return 'color';
    }
  }.property('faces'),
});