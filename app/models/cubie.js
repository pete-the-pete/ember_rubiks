import Ember from 'ember';
import DS from 'ember-data';
import { FACES, ROTATION_DIRECTIONS, AXES, FACE_INDEX } from '../constants';

var Cubie = DS.Model.extend({
  faces: DS.attr(),
  rotateFaceColors: function(rotation_data) {
    var tmp_color = null,
      faces = this.get('faces');

    if(rotation_data.direction === ROTATION_DIRECTIONS.CLOCKWISE) {
      switch(rotation_data.axis) {
        case AXES.X:
          //save off back
          tmp_color = Ember.get(faces.objectAt(FACE_INDEX.BACK), 'color');
          //back <- bottom
          Ember.set(faces.objectAt(FACE_INDEX.BACK), 'color', Ember.get(faces.objectAt(FACE_INDEX.BOTTOM), 'color'));
          //bottom <- front
          Ember.set(faces.objectAt(FACE_INDEX.BOTTOM), 'color', Ember.get(faces.objectAt(FACE_INDEX.FRONT), 'color'));
          //front <- top
          Ember.set(faces.objectAt(FACE_INDEX.FRONT), 'color', Ember.get(faces.objectAt(FACE_INDEX.TOP), 'color'));
          //top <- back
          Ember.set(faces.objectAt(FACE_INDEX.TOP), 'color', tmp_color);
          break;
        case AXES.Y:
          //safe off back
          tmp_color = Ember.get(faces.objectAt(FACE_INDEX.BACK), 'color');
          //back <- left
          Ember.set(faces.objectAt(FACE_INDEX.BACK), 'color', Ember.get(faces.objectAt(FACE_INDEX.LEFT), 'color'));
          //left <- front
          Ember.set(faces.objectAt(FACE_INDEX.LEFT), 'color', Ember.get(faces.objectAt(FACE_INDEX.FRONT), 'color'));
          //front <- right
          Ember.set(faces.objectAt(FACE_INDEX.FRONT), 'color', Ember.get(faces.objectAt(FACE_INDEX.RIGHT), 'color'));
          //right <- back
          Ember.set(faces.objectAt(FACE_INDEX.RIGHT), 'color', tmp_color);
          break;
        case AXES.Z:
          //save off left
          tmp_color = Ember.get(faces.objectAt(FACE_INDEX.LEFT), 'color');
          //left <- bottom
          Ember.set(faces.objectAt(FACE_INDEX.LEFT), 'color', Ember.get(faces.objectAt(FACE_INDEX.BOTTOM), 'color'));
          //bottom <- right
          Ember.set(faces.objectAt(FACE_INDEX.BOTTOM), 'color', Ember.get(faces.objectAt(FACE_INDEX.RIGHT), 'color'));
          //right <- top
          Ember.set(faces.objectAt(FACE_INDEX.RIGHT), 'color', Ember.get(faces.objectAt(FACE_INDEX.TOP), 'color'));
          //top <- left
          Ember.set(faces.objectAt(FACE_INDEX.TOP), 'color', tmp_color);
          break;
      }
    } else if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      switch(rotation_data.axis) {
        case AXES.X:
          //save off back
          tmp_color = Ember.get(faces.objectAt(FACE_INDEX.BACK), 'color');
          //back <- top
          Ember.set(faces.objectAt(FACE_INDEX.BACK), 'color', Ember.get(faces.objectAt(FACE_INDEX.TOP), 'color'));
          //top <- front
          Ember.set(faces.objectAt(FACE_INDEX.TOP), 'color', Ember.get(faces.objectAt(FACE_INDEX.FRONT), 'color'));
          //front <- bottom
          Ember.set(faces.objectAt(FACE_INDEX.FRONT), 'color', Ember.get(faces.objectAt(FACE_INDEX.BOTTOM), 'color'));
          //bottom <- back
          Ember.set(faces.objectAt(FACE_INDEX.BOTTOM), 'color', tmp_color);
          break;
        case AXES.Y:
          //safe off back
          tmp_color = Ember.get(faces.objectAt(FACE_INDEX.BACK), 'color');
          //back <- right
          Ember.set(faces.objectAt(FACE_INDEX.BACK), 'color', Ember.get(faces.objectAt(FACE_INDEX.RIGHT), 'color'));
          //right <- front
          Ember.set(faces.objectAt(FACE_INDEX.RIGHT), 'color', Ember.get(faces.objectAt(FACE_INDEX.FRONT), 'color'));
          //front <- left
          Ember.set(faces.objectAt(FACE_INDEX.FRONT), 'color', Ember.get(faces.objectAt(FACE_INDEX.LEFT), 'color'));
          //left <- back
          Ember.set(faces.objectAt(FACE_INDEX.LEFT), 'color', tmp_color);
          break;
        case AXES.Z:
          //save off left
          tmp_color = Ember.get(faces.objectAt(FACE_INDEX.LEFT), 'color');
          //left <- top
          Ember.set(faces.objectAt(FACE_INDEX.LEFT), 'color', Ember.get(faces.objectAt(FACE_INDEX.TOP), 'color'));
          //top <- right
          Ember.set(faces.objectAt(FACE_INDEX.TOP), 'color', Ember.get(faces.objectAt(FACE_INDEX.RIGHT), 'color'));
          //right <- bottom
          Ember.set(faces.objectAt(FACE_INDEX.RIGHT), 'color', Ember.get(faces.objectAt(FACE_INDEX.BOTTOM), 'color'));
          //bottom <- left
          Ember.set(faces.objectAt(FACE_INDEX.BOTTOM), 'color', tmp_color);
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