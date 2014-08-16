import Ember from 'ember';
import { ROTATION_DIRECTIONS, AXES } from '../constants';

export default Ember.Controller.extend({

  swapCubies: function(rotation_data, layer, section, cubie) {
    var to_index = null,
      from_index = null,
      cubies = rotation_data.cube.get('data').cubies;

      to_index = (9*layer.to) + (3*section.to) + cubie.to;

      if(cubie.from !== null) {
        //swap the cubie with the new one
        from_index = (9*layer.from) + (3*section.from) + cubie.from;
        cubies.replace(to_index, 1, [cubies.objectAt(from_index)]);
      } else {
        //swap th ecubie with the passed in object
        cubies.replace(to_index, 1, [cubie]);
      }
      //update its colors
      (cubies.objectAt(to_index)).rotateFaceColors(rotation_data);
  },

  getTempCubieIndex: function(positionData, axis, outer_index, inner_index) {
    var index;

    if(axis === AXES.X) {
      index = positionData.cubie + outer_index + (inner_index*3);
    } else if(axis === AXES.Y) {
      index = (positionData.layer*9) + outer_index + inner_index;
    } else if(axis === AXES.Z) {
      index = (positionData.section*3) + outer_index + inner_index;
    }
    return index;
  },

  calculateSwaps: function(rotation_data, outer_index, inner_index) {
    var tempCubie = null,
      cubies = rotation_data.cube.get('data').cubies,
      positionData = rotation_data.positionData,
      axis = rotation_data.axis,
      rotations = [],
      layer_moves = null,
      section_moves = null,
      cubie_moves = null,
      sidesLength = 3; //hardcode for now

    if(axis === AXES.X) {
      cubie_moves = {
        from: positionData.cubie,
        to: positionData.cubie
      };
    } else if(axis === AXES.Y) {
      layer_moves = {
        from: positionData.layer,
        to: positionData.layer
      };
    } else {
      section_moves = {
        from: positionData.section,
        to: positionData.section
      };
    }

    if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      //pull out the first cubie
      tempCubie = cubies[this.getTempCubieIndex(positionData, axis, outer_index, inner_index)];

      layer_moves = (axis === AXES.Y) ? layer_moves : { from: inner_index, to: outer_index };
      section_moves = (axis === AXES.Z) ? section_moves : (axis === AXES.X) ? { from: sidesLength-outer_index-1, to: inner_index } : { from: inner_index, to: outer_index };
      cubie_moves = (axis === AXES.X) ? cubie_moves : { from: sidesLength-outer_index-1, to: inner_index };
      rotations.push([ layer_moves, section_moves, cubie_moves ]);

      layer_moves = (axis === AXES.Y) ? layer_moves : { from: sidesLength-outer_index-1, to: inner_index };
      section_moves = (axis === AXES.Z) ? section_moves : (axis === AXES.X) ? { from: sidesLength-inner_index-1, to: sidesLength-outer_index-1 } : { from: sidesLength-outer_index-1, to: inner_index };
      cubie_moves = (axis === AXES.X) ? cubie_moves : { from: sidesLength-inner_index-1, to: sidesLength-outer_index-1 };
      rotations.push([ layer_moves, section_moves, cubie_moves ]);

      layer_moves = (axis === AXES.Y) ? layer_moves : { from: sidesLength-inner_index-1, to: sidesLength-outer_index-1 };
      section_moves = (axis === AXES.Z) ? section_moves : (axis === AXES.X) ? { from: outer_index, to: sidesLength-inner_index-1 } : { from: sidesLength-inner_index-1, to: sidesLength-outer_index-1 };
      cubie_moves = (axis === AXES.X) ? cubie_moves : { from: outer_index, to: sidesLength-inner_index-1 };
      rotations.push([ layer_moves, section_moves, cubie_moves ]);

      //special case, the temp cubie is passed in directly
      layer_moves = (axis === AXES.Y) ? layer_moves : { from: null, to: sidesLength-inner_index-1 };
      section_moves = (axis === AXES.Z) ? section_moves : (axis === AXES.X) ? {from: null, to: outer_index} : { from: null, to: sidesLength-inner_index-1 };
      tempCubie.to = (axis === AXES.X) ? cubie_moves.to : outer_index;
      tempCubie.from = null;
      rotations.push([ layer_moves, section_moves, tempCubie ]);

    } else {
      tempCubie = cubies[this.getTempCubieIndex(positionData, axis, outer_index, inner_index)];

      layer_moves = (axis === AXES.Y) ? layer_moves : { from: sidesLength-inner_index-1, to: outer_index };
      section_moves = (axis === AXES.Z) ? section_moves : (axis === AXES.X) ? { from: outer_index, to: inner_index } : { from: sidesLength-inner_index-1, to: outer_index };
      cubie_moves = (axis === AXES.X) ? cubie_moves : { from: outer_index, to: inner_index };
      rotations.push([ layer_moves, section_moves, cubie_moves ]);

      layer_moves = (axis === AXES.Y) ? layer_moves : { from: sidesLength-outer_index-1, to: sidesLength-inner_index-1 };
      section_moves = (axis === AXES.Z) ? section_moves : (axis === AXES.X) ? { from: sidesLength-inner_index-1, to: outer_index } : { from: sidesLength-outer_index-1, to: sidesLength-inner_index-1 };
      cubie_moves = (axis === AXES.X) ? cubie_moves : { from: sidesLength-inner_index-1, to: outer_index };
      rotations.push([ layer_moves, section_moves, cubie_moves ]);

      layer_moves = (axis === AXES.Y) ? layer_moves : { from: inner_index, to: sidesLength-outer_index-1 };
      section_moves = (axis === AXES.Z) ? section_moves : (axis === AXES.X) ? { from: sidesLength-outer_index-1, to: sidesLength-inner_index-1 } : { from: inner_index, to: sidesLength-outer_index-1 };
      cubie_moves = (axis === AXES.X) ? cubie_moves : { from: sidesLength-outer_index-1, to: sidesLength-inner_index-1 };
      rotations.push([ layer_moves, section_moves, cubie_moves ]);

      //special case, the temp cubie is passed in directly
      layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: null, to: inner_index };
      section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: null, to: sidesLength-outer_index-1 } : { from: null, to: inner_index };
      tempCubie.to = (rotation_data.axis === AXES.X) ? cubie_moves.to : sidesLength-outer_index-1;
      tempCubie.from = null;
      rotations.push([ layer_moves, section_moves, tempCubie ]);
    }
    return rotations;
  },

  rotateSlice: function(rotation_data) {
    var sidesLength = 3, //hardcoded for now
        rotations = [];

    //just loop, and we can sort it out in the actual swap
    for(var outer_index=0; outer_index < sidesLength/2; outer_index++) {
      for(var inner_index=outer_index; inner_index < (sidesLength - outer_index - 1); inner_index++) {
        rotations = rotations.concat(this.calculateSwaps(rotation_data, outer_index, inner_index));
      }
    }

    //perform the moves
    rotations.forEach(function(rotation) {
      this.swapCubies(rotation_data, rotation[0], rotation[1], rotation[2]);
    }, this);
  },

  actions: {
    handleMove: function(rotation_data) {
      this.rotateSlice(rotation_data);
    },
    handleRotation: function(data) {
      console.log(data);
    }
  }
});