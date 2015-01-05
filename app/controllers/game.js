import Ember from 'ember';
import { ROTATION_DIRECTIONS, AXES, FACES_INDECES } from '../constants';

var _set = Ember.set,
    _get = Ember.get;

export default Ember.Controller.extend({

  movesList: Ember.computed.alias('model.cube.moves.content'),

  getCubies: function() {
    return this.get('model').get('cube').get('cubies').get('content').get('content');
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

  rotateCubies: function(rotation_data) {
    var tmpCubie = null,
      _cubies = this.get('model').get('cube').get('cubies').get('content').get('content'),
      cubies = rotation_data.rotatingCubies;

    if(rotation_data.direction === ROTATION_DIRECTIONS.ANTICLOCKWISE) {
      tmpCubie = cubies.objectAt(0).get('cubie');
      //6 => 0
      _cubies.replace(cubies.objectAt(0).get('index'), 1, [cubies.objectAt(2).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(0).get('index')));
      //8 => 6
      _cubies.replace(cubies.objectAt(2).get('index'), 1, [cubies.objectAt(8).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(2).get('index')));
      //2 => 8
      _cubies.replace(cubies.objectAt(8).get('index'), 1, [cubies.objectAt(6).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(8).get('index')));
      //0 => 2
      _cubies.replace(cubies.objectAt(6).get('index'), 1, [tmpCubie]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(6).get('index')));

      tmpCubie = cubies.objectAt(1).get('cubie');
      //1 => 5
      _cubies.replace(cubies.objectAt(1).get('index'), 1, [cubies.objectAt(5).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(1).get('index')));
      //5 => 7
      _cubies.replace(cubies.objectAt(5).get('index'), 1, [cubies.objectAt(7).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(5).get('index')));
      //7 => 3
      _cubies.replace(cubies.objectAt(7).get('index'), 1, [cubies.objectAt(3).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(7).get('index')));
      //3 => 1
      _cubies.replace(cubies.objectAt(3).get('index'), 1, [tmpCubie]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(3).get('index')));

    } else {
      tmpCubie = cubies.objectAt(0).get('cubie');
      //6 => 0
      _cubies.replace(cubies.objectAt(0).get('index'), 1, [cubies.objectAt(6).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(0).get('index')));
      //8 => 6
      _cubies.replace(cubies.objectAt(6).get('index'), 1, [cubies.objectAt(8).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(6).get('index')));
      //2 => 8
      _cubies.replace(cubies.objectAt(8).get('index'), 1, [cubies.objectAt(2).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(8).get('index')));
      //0 => 2
      _cubies.replace(cubies.objectAt(2).get('index'), 1, [tmpCubie]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(2).get('index')));

      tmpCubie = cubies.objectAt(1).get('cubie');
      //1 => 5
      _cubies.replace(cubies.objectAt(1).get('index'), 1, [cubies.objectAt(3).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(1).get('index')));
      //5 => 7
      _cubies.replace(cubies.objectAt(3).get('index'), 1, [cubies.objectAt(7).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(3).get('index')));
      //7 => 3
      _cubies.replace(cubies.objectAt(7).get('index'), 1, [cubies.objectAt(5).get('cubie')]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(7).get('index')));
      //3 => 1
      _cubies.replace(cubies.objectAt(5).get('index'), 1, [tmpCubie]);
      this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(5).get('index')));
    }
    _cubies.replace(cubies.objectAt(4).get('index'), 1, [cubies.objectAt(4).get('cubie')]);
    this.rotateFaceColors(rotation_data, _cubies.objectAt(cubies.objectAt(4).get('index')));
  },


  createMove: function(rotation_data) {
    var move,
      cube = this.get('model').get('cube'),
      moves = cube.get('moves');

    cube.incrementProperty('moveCount');

    Ember.run.next(this, function() {
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
    });

    
    /*moves.then(function(moves) {
      moves.get(pushObject(move);
    });*/
  },

  rotateSlice: function(rotation_data) {
    this.rotateCubies(rotation_data);
  },

  actions: {
    /**
     * Moving a single slice counts towards solving the cube.  The individual
     * slice is rotated and the model is updated.  The move and updated
     * state are saved into the moves history.
     */
    handleMove: function(rotation_data) {
      rotation_data.oldCubies = this.copyCubies();
      //do the rotation
      Ember.run.next(this, this.rotateSlice, rotation_data);
      //create move
      Ember.run.schedule('afterRender', this, this.createMove, rotation_data);
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
      for(var i=0;i<3;i++) {
        console.debug(rotation_data.rotatingCubies[i]);
        this.rotateSlice({
          cube: rotation_data.cube,
          type: rotation_data.type,
          positionData: rotation_data.positionData,
          rotatingCubies: rotation_data.rotatingCubies[i],
          direction: rotation_data.direction,
          axis: rotation_data.axis
        });
      }
      /*rotation_data.rotatingCubies.forEach(function(rData, index, list) {
        rotation_data_copy.rotatingCubies = list[index];//rData;
        console.debug(rotation_data_copy.rotatingCubies.objectAt(0).toString());
        this.rotateSlice(rotation_data_copy);
        //create move
        //Ember.run.next(this, 'createMove', rotation_data_copy);
      }, this);*/
    }
  }
});