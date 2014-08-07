import Ember from 'ember';
import { ROTATION_DIRECTIONS, AXES } from '../constants';

export default Ember.ArrayController.extend({

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

  getTempCubie: function(rotation_data, outer_index, inner_index) {
    var index = null,
      activeCubie = rotation_data.cubieView,
      section = activeCubie.get('_sectionIndex'),
      layer = activeCubie.get('_layerIndex'),
      cubie = activeCubie.get('_cubieIndex'),
      cubies = rotation_data.cube.get('data').cubies;

    if(rotation_data.axis === AXES.X) {
      index = (cubie-1) + outer_index + (inner_index*3);
    } else if(rotation_data.axis === AXES.Y) {
      index = ((layer-1)*9) + outer_index + inner_index;
    } else if(rotation_data.axis === AXES.Z) {
      index = ((section-1)*3) + outer_index + inner_index;
    }
    return cubies[index];
  },

  performMove: function(rotation_data, outer_index, inner_index) {
    var tempCubie = null,
      activeCubie = rotation_data.cubieView,
      rotations = [],
      layer_moves = null,
      section_moves = null,
      cubie_moves = {},
      sidesLength = 3; //hardcode for now

    if(rotation_data.axis === AXES.Y) {
      layer_moves = {
        from: activeCubie.get('_layerIndex')-1,
        to: activeCubie.get('_layerIndex')-1
      };
    } else if(rotation_data.axis === AXES.X) {
      cubie_moves = {
        from: activeCubie.get('_cubieIndex')-1,
        to: activeCubie.get('_cubieIndex')-1
      };
    } else {
      section_moves = {
        from: activeCubie.get('_sectionIndex')-1,
        to: activeCubie.get('_sectionIndex')-1
      };
    }

    if(outer_index < sidesLength/2) {
      if(inner_index >= outer_index && inner_index < (sidesLength - outer_index - 1)) {
        if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
          //pull out the first cubie
          tempCubie = this.getTempCubie(rotation_data, outer_index, inner_index);

          layer_moves = (rotation_data.axis === AXES.Y) ? layer_moves : { from: inner_index, to: outer_index };
          section_moves = (rotation_data.axis === AXES.Z) ? section_moves : (rotation_data.axis === AXES.X) ? { from: sidesLength-outer_index-1, to: inner_index } : { from: inner_index, to: outer_index };
          cubie_moves = (rotation_data.axis === AXES.X) ? cubie_moves : { from: sidesLength-outer_index-1, to: inner_index };
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

      //just loop, and we can sort it out in the actual swap
      for(var outer_index=0; outer_index < 3; outer_index++) {
        for(var inner_index=0; inner_index <3; inner_index++) {
          rotations = rotations.concat(this.performMove(rotation_data, outer_index, inner_index));
        }
      }

      //perform the moves
      rotations.forEach(function(rotation) {
        this.swapCubies(rotation_data, rotation[0], rotation[1], rotation[2]);
      }, this);

    },
    handleRotation: function(data) {
      console.log(data);
    }
  }
});