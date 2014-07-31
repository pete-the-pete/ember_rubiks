import Ember from 'ember';
import { ROTATION_DIRECTIONS, AXES, COLORS, FACE_INDEX } from '../constants';

export default Ember.ArrayController.extend({

  rotateCubieColors: function(cubie, rotation_data) {
    var tmp_color = null,
      new_color = null,
      faces = cubie.get('faces');

    //the middle cube doesn't have any faces
    if(!faces.length) {
      return;
    }
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
  },

  /**
  * Swap cubies in a section.  The to and from
  * are arrays with the form [section,cubie].
  **/
  swapCubies_old: function(rotation_data, sections, from, to) {
    sections.objectAt(to[0]).get('cubies').replace(to[1], 1,
      [sections.objectAt(from[0]).get('cubies').objectAt(from[1])]);
  },

  swapCubies: function(rotation_data, layer, section, cubie) {
    var cube = rotation_data.cube,
      from = null,
      to = cube.get('data').layers.objectAt(layer.to)
            .get('data').sections.objectAt(section.to)
            .get('data').cubies;

      if(cubie.from !== null) {
        from = cube.get('data').layers.objectAt(layer.from)
                .get('data').sections.objectAt(section.from)
                .get('data').cubies;

        //swap the cubie
        to.replace(cubie.to, 1, [from.objectAt(cubie.from)]);
      } else {
        to.replace(cubie.to, 1, [cubie]);
      }
      //update its colors
      this.rotateCubieColors(to.objectAt(cubie.to), rotation_data);
      //TODO: delete the property in case it was from an actual cube

  },

  getTempCubie: function(rotation_data, outer_index, inner_index) {
    if(rotation_data.axis === AXES.X) {
      return rotation_data.cube.get('data').layers.objectAt(outer_index)
                              .get('data').sections.objectAt(inner_index)
                              .get('data').cubies.objectAt(rotation_data.cubieIndex);
    } else if(rotation_data.axis === AXES.Y) {
      return rotation_data.cube.get('data').layers.objectAt(rotation_data.layerIndex)
                              .get('data').sections.objectAt(outer_index)
                              .get('data').cubies.objectAt(inner_index);
    } else if(rotation_data.axis === AXES.Z) {
      return rotation_data.cube.get('data').layers.objectAt(outer_index)
                              .get('data').sections.objectAt(rotation_data.sectionIndex)
                              .get('data').cubies.objectAt(inner_index);
    }
  },

  performMove: function(rotation_data, outer_index, inner_index) {
    var tempCubie = null,
      rotations = [],
      layer_moves = null,
      section_moves = null,
      cubie_moves = {},
      sidesLength = rotation_data.cube.get('data').layers.length;

    if(rotation_data.axis === AXES.Y) {
      layer_moves = {
        from: rotation_data.layerIndex,
        to: rotation_data.layerIndex
      };
    } else if(rotation_data.axis === AXES.X) {
      cubie_moves = {
        from: rotation_data.cubieIndex,
        to: rotation_data.cubieIndex
      };
    } else {
      section_moves = {
        from: rotation_data.sectionIndex,
        to: rotation_data.sectionIndex
      };
    }

    if(outer_index < sidesLength/2) {
      if(inner_index >= outer_index && inner_index < (sidesLength - outer_index - 1)) {
        if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
          //pull out the first cubie
          tempCubie = this.getTempCubie(rotation_data, outer_index, inner_index);

          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: inner_index, to: outer_index };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: sidesLength-outer_index-1, to: inner_index } : { from: inner_index, to: outer_index };
          cubie_moves = (rotation_data.axis == AXES.X) ? cubie_moves : { from: sidesLength-outer_index-1, to: inner_index };
          rotations.push([ layer_moves, section_moves, cubie_moves ]);

          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: sidesLength-outer_index-1, to: inner_index };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: sidesLength-inner_index-1, to: sidesLength-outer_index-1 } : { from: sidesLength-outer_index-1, to: inner_index };
          cubie_moves = (rotation_data.axis === AXES.X) ? cubie_moves : { from: sidesLength-inner_index-1, to: sidesLength-outer_index-1 };
          rotations.push([ layer_moves, section_moves, cubie_moves ]);

          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: sidesLength-inner_index-1, to: sidesLength-outer_index-1 };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: outer_index, to: sidesLength-inner_index-1 } : { from: sidesLength-inner_index-1, to: sidesLength-outer_index-1 };
          cubie_moves = (rotation_data.axis === AXES.X) ? cubie_moves : { from: outer_index, to: sidesLength-inner_index-1 };
          rotations.push([ layer_moves, section_moves, cubie_moves ]);

          //special case, the temp cubie is passed in directly
          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: null, to: sidesLength-inner_index-1 };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? {from: null, to: outer_index} : { from: null, to: sidesLength-inner_index-1 };
          tempCubie.to = (rotation_data.axis === AXES.X) ? cubie_moves.to : outer_index;
          tempCubie.from = null;
          rotations.push([ layer_moves, section_moves, tempCubie ]);

        } else {
          tempCubie = this.getTempCubie(rotation_data, outer_index, inner_index);

          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: sidesLength-inner_index-1, to: outer_index };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: outer_index, to: inner_index } : { from: sidesLength-inner_index-1, to: outer_index };
          cubie_moves = (rotation_data.axis === AXES.X) ? cubie_moves : { from: outer_index, to: inner_index };
          rotations.push([ layer_moves, section_moves, cubie_moves ]);

          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: sidesLength-outer_index-1, to: sidesLength-inner_index-1 };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: sidesLength-inner_index-1, to: outer_index } : { from: sidesLength-outer_index-1, to: sidesLength-inner_index-1 };
          cubie_moves = (rotation_data.axis === AXES.X) ? cubie_moves : { from: sidesLength-inner_index-1, to: outer_index };
          rotations.push([ layer_moves, section_moves, cubie_moves ]);

          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: inner_index, to: sidesLength-outer_index-1 };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: sidesLength-outer_index-1, to: sidesLength-inner_index-1 } : { from: inner_index, to: sidesLength-outer_index-1 };
          cubie_moves = (rotation_data.axis === AXES.X) ? cubie_moves : { from: sidesLength-outer_index-1, to: sidesLength-inner_index-1 };
          rotations.push([ layer_moves, section_moves, cubie_moves ]);

          //special case, the temp cubie is passed in directly
          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: null, to: inner_index };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: null, to: sidesLength-outer_index-1 } : { from: null, to: inner_index };
          tempCubie.to = (rotation_data.axis === AXES.X) ? cubie_moves.to : sidesLength-outer_index-1;
          tempCubie.from = null;
          rotations.push([ layer_moves, section_moves, tempCubie ]);
        }
      }
    }
    return rotations;
  },

  actions: {
    handleMove: function(rotation_data) {

      var rotations = [];

      if(rotation_data.axis !== AXES.Y) {
        rotation_data.cube.get('data').layers.forEach(function(layer, outer_index, layers) {
          rotation_data.section.get('data').cubies.forEach(function(cubie, inner_index, cubies) {
            rotations = rotations.concat(this.performMove(rotation_data, outer_index, inner_index));
          }.bind(this));
        }.bind(this));
      } else {
        rotation_data.layer.get('data').sections.forEach(function(section, outer_index, sections) {
          section.get('data').cubies.forEach(function(cubie, inner_index, cubies) {
            rotations = rotations.concat(this.performMove(rotation_data, outer_index, inner_index));
          }.bind(this));
        }.bind(this));
      }

      //perform the moves
      rotations.forEach(function(rotation, r_index, rotations) {
        this.swapCubies(rotation_data, rotation[0], rotation[1], rotation[2]);
      }.bind(this));

      rotation_data.cubeView.rerender();

      //reset the cursor
      Ember.run.schedule('afterRender', function() {
        rotation_data.cubeView.navigate();
      });
    },
    handleRotation: function(data) {
      console.log(data);
    }
  }
});