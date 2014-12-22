import Ember from 'ember';
import { ROTATION_DIRECTIONS, AXES, FACES_INDECES } from '../constants';

var _set = Ember.set,
    _get = Ember.get;

export default Ember.Controller.extend({

  movesList: Ember.computed.alias('model.cube.moves.content'),

  getCubies: function() {
    return this.get('model').get('cube').get('cubies').get('content').get('content');
    //return this.get('model').get('cube').get('cubies');
  },

  /**
  * Copy the cubies and their faces so that we break
  * the link with the actual model reference,
  * otherwise subsequent actions will affect the
  * save cubies
  */
  copyCubies: function() {
    var copy = this.get('model').get('cube').get('cubies').map(function(cubie) {
      var copy = cubie.toJSON();
      copy.id = cubie.id;
      copy.faces = Ember.copy(cubie.get('faces'), true);
      return copy;
    });
    return copy;
  },

  rotateFaceColors: function(rotation_data, cubie) {
    var tmp_color = null,
        faces = cubie.get('faces');

    if(rotation_data.direction === ROTATION_DIRECTIONS.CLOCKWISE) {
      switch(rotation_data.axis) {
        case AXES.X:
          //save off back
          tmp_color = _get(faces.objectAt(FACES_INDECES.BACK), 'color');
          //back <- bottom
          _set(faces.objectAt(FACES_INDECES.BACK), 'color', _get(faces.objectAt(FACES_INDECES.BOTTOM), 'color'));
          //bottom <- front
          _set(faces.objectAt(FACES_INDECES.BOTTOM), 'color', _get(faces.objectAt(FACES_INDECES.FRONT), 'color'));
          //front <- top
          _set(faces.objectAt(FACES_INDECES.FRONT), 'color', _get(faces.objectAt(FACES_INDECES.TOP), 'color'));
          //top <- back
          _set(faces.objectAt(FACES_INDECES.TOP), 'color', tmp_color);
          break;
        case AXES.Y:
          //safe off back
          tmp_color = _get(faces.objectAt(FACES_INDECES.BACK), 'color');
          //back <- left
          _set(faces.objectAt(FACES_INDECES.BACK), 'color', _get(faces.objectAt(FACES_INDECES.LEFT) ,'color'));
          //left <- front
          _set(faces.objectAt(FACES_INDECES.LEFT), 'color', _get(faces.objectAt(FACES_INDECES.FRONT) ,'color'));
          //front <- right
          _set(faces.objectAt(FACES_INDECES.FRONT), 'color', _get(faces.objectAt(FACES_INDECES.RIGHT) ,'color'));
          //right <- back
          _set(faces.objectAt(FACES_INDECES.RIGHT), 'color', tmp_color);
          break;
        case AXES.Z:
          //save off left
          tmp_color = _get(faces.objectAt(FACES_INDECES.LEFT), 'color');
          //left <- bottom
          _set(faces.objectAt(FACES_INDECES.LEFT), 'color', _get(faces.objectAt(FACES_INDECES.BOTTOM), 'color'));
          //bottom <- right
          _set(faces.objectAt(FACES_INDECES.BOTTOM), 'color', _get(faces.objectAt(FACES_INDECES.RIGHT), 'color'));
          //right <- top
          _set(faces.objectAt(FACES_INDECES.RIGHT), 'color', _get(faces.objectAt(FACES_INDECES.TOP), 'color'));
          //top <- left
          _set(faces.objectAt(FACES_INDECES.TOP), 'color', tmp_color);
          break;
      }
    } else if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      switch(rotation_data.axis) {
        case AXES.X:
          //save off back
          tmp_color = _get(faces.objectAt(FACES_INDECES.BACK), 'color');
          //back <- top
          _set(faces.objectAt(FACES_INDECES.BACK), 'color', _get(faces.objectAt(FACES_INDECES.TOP), 'color'));
          //top <- front
          _set(faces.objectAt(FACES_INDECES.TOP), 'color', _get(faces.objectAt(FACES_INDECES.FRONT), 'color'));
          //front <- bottom
          _set(faces.objectAt(FACES_INDECES.FRONT), 'color', _get(faces.objectAt(FACES_INDECES.BOTTOM), 'color'));
          //bottom <- back
          _set(faces.objectAt(FACES_INDECES.BOTTOM), 'color', tmp_color);
          break;
        case AXES.Y:
          //safe off back
          tmp_color = _get(faces.objectAt(FACES_INDECES.BACK), 'color');
          //back <- right
          _set(faces.objectAt(FACES_INDECES.BACK), 'color', _get(faces.objectAt(FACES_INDECES.RIGHT), 'color'));
          //right <- front
          _set(faces.objectAt(FACES_INDECES.RIGHT), 'color', _get(faces.objectAt(FACES_INDECES.FRONT), 'color'));
          //front <- left
          _set(faces.objectAt(FACES_INDECES.FRONT), 'color', _get(faces.objectAt(FACES_INDECES.LEFT), 'color'));
          //left <- back
          _set(faces.objectAt(FACES_INDECES.LEFT), 'color', tmp_color);
          break;
        case AXES.Z:
          //save off left
          tmp_color = _get(faces.objectAt(FACES_INDECES.LEFT), 'color');
          //left <- top
          _set(faces.objectAt(FACES_INDECES.LEFT), 'color', _get(faces.objectAt(FACES_INDECES.TOP), 'color'));
          //top <- right
          _set(faces.objectAt(FACES_INDECES.TOP), 'color', _get(faces.objectAt(FACES_INDECES.RIGHT), 'color'));
          //right <- bottom
          _set(faces.objectAt(FACES_INDECES.RIGHT), 'color', _get(faces.objectAt(FACES_INDECES.BOTTOM), 'color'));
          //bottom <- left
          _set(faces.objectAt(FACES_INDECES.BOTTOM), 'color', tmp_color);
          break;
      }
    }
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

  /**
  * Swap the cubies using the native splice method on the content array
  * so that the model isn't automatically updated when the items are
  * removed/inserted into the model.
  */
  swapCubies: function(cubies, rotation_data, layer, section, cubie) {
    var to_index = null,
        from_index = null;

      to_index = (9*layer.to) + (3*section.to) + cubie.to;

      if(cubie.from !== null) {
        //swap the cubie with the new one
        from_index = (9*layer.from) + (3*section.from) + cubie.from;
        cubies.get('content').splice(to_index, 1, cubies.objectAt(from_index));
      } else {
        //swap the cubie with the passed in object
        delete cubie.to;
        delete cubie.from;
        cubies.get('content').splice(to_index, 1, cubie);
      }
      //update its colors
      this.rotateFaceColors(rotation_data, cubies.objectAt(to_index));
  },

  calculateSwaps: function(rotation_data, outer_index, inner_index) {
    var tempCubie = null,
      cubies = this.getCubies(rotation_data.cube),
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

    //pull out the first cubie
    tempCubie = cubies.objectAt(this.getTempCubieIndex(positionData, axis, outer_index, inner_index));

    if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {

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

  rotateCubies: function(rotation_data) {
    var tmpCubie = null,
      _cubies = this.get('model').get('cube').get('cubies').get('content').get('content'),
      cubies = rotation_data.rotatingCubies;

    if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      tmpCubie = cubies.objectAt(0).get('cubie');
      //6 => 0
      _cubies.replace(cubies.objectAt(0).get('index'), 1, [cubies.objectAt(2).get('cubie')]);
      //8 => 6
      _cubies.replace(cubies.objectAt(2).get('index'), 1, [cubies.objectAt(8).get('cubie')]);
      //2 => 8
      _cubies.replace(cubies.objectAt(8).get('index'), 1, [cubies.objectAt(6).get('cubie')]);
      //0 => 2
      _cubies.replace(cubies.objectAt(6).get('index'), 1, [tmpCubie]);

      tmpCubie = cubies.objectAt(1).get('cubie');
      //1 => 5
      _cubies.replace(cubies.objectAt(1).get('index'), 1, [cubies.objectAt(5).get('cubie')]);
      //5 => 7
      _cubies.replace(cubies.objectAt(5).get('index'), 1, [cubies.objectAt(7).get('cubie')]);
      //7 => 3
      _cubies.replace(cubies.objectAt(7).get('index'), 1, [cubies.objectAt(3).get('cubie')]);
      //3 => 1
      _cubies.replace(cubies.objectAt(3).get('index'), 1, [tmpCubie]);

    } else {
      tmpCubie = cubies.objectAt(0).get('cubie');
      //6 => 0
      _cubies.replace(cubies.objectAt(0).get('index'), 1, [cubies.objectAt(6).get('cubie')]);
      //8 => 6
      _cubies.replace(cubies.objectAt(6).get('index'), 1, [cubies.objectAt(8).get('cubie')]);
      //2 => 8
      _cubies.replace(cubies.objectAt(8).get('index'), 1, [cubies.objectAt(2).get('cubie')]);
      //0 => 2
      _cubies.replace(cubies.objectAt(2).get('index'), 1, [tmpCubie]);

      tmpCubie = cubies.objectAt(1).get('cubie');
      //1 => 5
      _cubies.replace(cubies.objectAt(1).get('index'), 1, [cubies.objectAt(3).get('cubie')]);
      //5 => 7
      _cubies.replace(cubies.objectAt(3).get('index'), 1, [cubies.objectAt(7).get('cubie')]);
      //7 => 3
      _cubies.replace(cubies.objectAt(7).get('index'), 1, [cubies.objectAt(5).get('cubie')]);
      //3 => 1
      _cubies.replace(cubies.objectAt(5).get('index'), 1, [tmpCubie]);
    }
    _cubies.replace(cubies.objectAt(4).get('index'), 1, [cubies.objectAt(4).get('cubie')]);
  },

  rotateSlice: function(rotation_data) {
    rotation_data.rotatingCubies.forEach(function(cubie) {
      this.rotateFaceColors(rotation_data, cubie.get('cubie'));
    }, this);
    Ember.run.next(this, this.rotateCubies, rotation_data);
  },

  createMove: function(rotation_data) {
    var move,
      cube = this.get('model').get('cube'),
      moves = cube.get('moves');

    move = this.store.createRecord('move', {
      timestamp: (new Date()).getTime(),
      direction: rotation_data.direction,
      axis: rotation_data.axis,
      type: rotation_data.type,
      oldCubies: rotation_data.oldCubies,
      cubies: this.copyCubies(),
      positionData: rotation_data.positionData,
      parentMove: null
    });
    //the moves ref on the cube object is changing, and causing
    //the entire game history to be rewritten

    moves.get('content').pushObject(move);
    /*moves.then(function(moves) {
      moves.get(pushObject(move);
    });*/
  },

  actions: {
    /**
     * Moving a single slice counts towards solving the cube.  The individual
     * slice is rotated and the model is updated.  The move and updated
     * state are saved into the moves history.
     */
    handleMove: function(rotation_data) {
      var cube = this.get('model').get('cube');

      rotation_data.oldCubies = this.copyCubies();
      //do the rotation
      this.rotateSlice(rotation_data);
      //create move
      Ember.run.next(this, function() {
        cube.incrementProperty('moveCount');
        Ember.run.next(this, 'createMove', rotation_data);
      });


      //save everything
      /*rotatingCubies.forEach(function(c) {
        delete c.get('faces').__nextSuper;
        c.save();
      });
      this.get('model').get('cube').then(function(cube) {
        cube.save();
      });*/
    },
    handleRotation: function(rotation_data) {
      rotation_data.oldCubies = this.copyCubies();
      //do the rotations by doing the individual slices
      var rotation_data_copy = Ember.copy(rotation_data);
      rotation_data.positionData.forEach(function(rData) {
        rotation_data_copy.positionData = rData;
        this.rotateSlice(rotation_data_copy);
      }.bind(this));
      //save the 'move'
      this.createMove(rotation_data);
    }
  }
});