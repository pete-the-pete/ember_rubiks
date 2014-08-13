import Ember from 'ember';
import DS from 'ember-data';
import { FACES, ROTATION_DIRECTIONS, AXES, FACES_INDECES } from '../constants';

var Cubie = DS.Model.extend({
  faces: DS.attr(),
  rotateFaceColors: function(rotation_data) {
    var tmp_color = null,
      faces = this.get('faces');

    if(rotation_data.direction === ROTATION_DIRECTIONS.CLOCKWISE) {
      switch(rotation_data.axis) {
        case AXES.X:
          //save off back
          tmp_color = Ember.get(faces.objectAt(FACES_INDECES.BACK), 'color');
          //back <- bottom
          Ember.set(faces.objectAt(FACES_INDECES.BACK), 'color', Ember.get(faces.objectAt(FACES_INDECES.BOTTOM), 'color'));
          //bottom <- front
          Ember.set(faces.objectAt(FACES_INDECES.BOTTOM), 'color', Ember.get(faces.objectAt(FACES_INDECES.FRONT), 'color'));
          //front <- top
          Ember.set(faces.objectAt(FACES_INDECES.FRONT), 'color', Ember.get(faces.objectAt(FACES_INDECES.TOP), 'color'));
          //top <- back
          Ember.set(faces.objectAt(FACES_INDECES.TOP), 'color', tmp_color);
          break;
        case AXES.Y:
          //safe off back
          tmp_color = Ember.get(faces.objectAt(FACES_INDECES.BACK), 'color');
          //back <- left
          Ember.set(faces.objectAt(FACES_INDECES.BACK), 'color', Ember.get(faces.objectAt(FACES_INDECES.LEFT), 'color'));
          //left <- front
          Ember.set(faces.objectAt(FACES_INDECES.LEFT), 'color', Ember.get(faces.objectAt(FACES_INDECES.FRONT), 'color'));
          //front <- right
          Ember.set(faces.objectAt(FACES_INDECES.FRONT), 'color', Ember.get(faces.objectAt(FACES_INDECES.RIGHT), 'color'));
          //right <- back
          Ember.set(faces.objectAt(FACES_INDECES.RIGHT), 'color', tmp_color);
          break;
        case AXES.Z:
          //save off left
          tmp_color = Ember.get(faces.objectAt(FACES_INDECES.LEFT), 'color');
          //left <- bottom
          Ember.set(faces.objectAt(FACES_INDECES.LEFT), 'color', Ember.get(faces.objectAt(FACES_INDECES.BOTTOM), 'color'));
          //bottom <- right
          Ember.set(faces.objectAt(FACES_INDECES.BOTTOM), 'color', Ember.get(faces.objectAt(FACES_INDECES.RIGHT), 'color'));
          //right <- top
          Ember.set(faces.objectAt(FACES_INDECES.RIGHT), 'color', Ember.get(faces.objectAt(FACES_INDECES.TOP), 'color'));
          //top <- left
          Ember.set(faces.objectAt(FACES_INDECES.TOP), 'color', tmp_color);
          break;
      }
    } else if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      switch(rotation_data.axis) {
        case AXES.X:
          //save off back
          tmp_color = Ember.get(faces.objectAt(FACES_INDECES.BACK), 'color');
          //back <- top
          Ember.set(faces.objectAt(FACES_INDECES.BACK), 'color', Ember.get(faces.objectAt(FACES_INDECES.TOP), 'color'));
          //top <- front
          Ember.set(faces.objectAt(FACES_INDECES.TOP), 'color', Ember.get(faces.objectAt(FACES_INDECES.FRONT), 'color'));
          //front <- bottom
          Ember.set(faces.objectAt(FACES_INDECES.FRONT), 'color', Ember.get(faces.objectAt(FACES_INDECES.BOTTOM), 'color'));
          //bottom <- back
          Ember.set(faces.objectAt(FACES_INDECES.BOTTOM), 'color', tmp_color);
          break;
        case AXES.Y:
          //safe off back
          tmp_color = Ember.get(faces.objectAt(FACES_INDECES.BACK), 'color');
          //back <- right
          Ember.set(faces.objectAt(FACES_INDECES.BACK), 'color', Ember.get(faces.objectAt(FACES_INDECES.RIGHT), 'color'));
          //right <- front
          Ember.set(faces.objectAt(FACES_INDECES.RIGHT), 'color', Ember.get(faces.objectAt(FACES_INDECES.FRONT), 'color'));
          //front <- left
          Ember.set(faces.objectAt(FACES_INDECES.FRONT), 'color', Ember.get(faces.objectAt(FACES_INDECES.LEFT), 'color'));
          //left <- back
          Ember.set(faces.objectAt(FACES_INDECES.LEFT), 'color', tmp_color);
          break;
        case AXES.Z:
          //save off left
          tmp_color = Ember.get(faces.objectAt(FACES_INDECES.LEFT), 'color');
          //left <- top
          Ember.set(faces.objectAt(FACES_INDECES.LEFT), 'color', Ember.get(faces.objectAt(FACES_INDECES.TOP), 'color'));
          //top <- right
          Ember.set(faces.objectAt(FACES_INDECES.TOP), 'color', Ember.get(faces.objectAt(FACES_INDECES.RIGHT), 'color'));
          //right <- bottom
          Ember.set(faces.objectAt(FACES_INDECES.RIGHT), 'color', Ember.get(faces.objectAt(FACES_INDECES.BOTTOM), 'color'));
          //bottom <- left
          Ember.set(faces.objectAt(FACES_INDECES.BOTTOM), 'color', tmp_color);
          break;
      }
    }
  }
});

var CUBIES = (function() {
  var cubies = [];
  for(var i=1;i<=27;i++) {
    cubies.pushObject({
      id: i,
      faces: Ember.copy(FACES, true)
    });
  }
  return cubies;
})();

Cubie.reopenClass({
  FIXTURES: CUBIES
});

export default Cubie;