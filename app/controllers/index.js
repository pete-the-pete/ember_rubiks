import { ROTATION_DIRECTIONS, AXES, COLORS } from '../constants';

export default Ember.ArrayController.extend({

  rotateCubieColors: function(cubie, rotation_data) {
    var tmp_color = null,
      new_color = null,
      faces = cubie.get('faces');
    if(rotation_data.direction === ROTATION_DIRECTIONS.CLOCKWISE) {
      switch(rotation_data.axis) {
        case AXES.Y:
          tmp_color = Ember.get(faces.objectAt(0), 'color');
          faces.forEach(function(face, f_index, faces) {
            if(f_index < 3) {
              new_color = Ember.get(faces.objectAt(f_index + 1), 'color');
              Ember.set(face, 'color', new_color);
            }
          });
          Ember.set(faces.objectAt(3), 'color', tmp_color);
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
    console.debug(layer.from,section.from,cubie.from,'->',layer.to,section.to,cubie.to);
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
      //delete the property in case it was from an actual cube
      delete cubie.to;
      delete cubie.from;

  },

  actions: {
    handleMove: function(rotation_data) {
      var to = [],
        from = [],
        sidesLength = 3,
        tempCubie = null;

      if(rotation_data.layer) {
        //we're rotating a layer
        rotation_data.layer.get('data').sections.forEach(function(section, s_index, sections) {
          //go halfway through
          if(s_index < sidesLength/2) {
            section.get('data').cubies.forEach(function(cubie, c_index, cubies) {
              if(c_index <= s_index && c_index < (sidesLength - s_index - 1)) {

                if(rotation_data.direction === ROTATION_DIRECTIONS.CLOCKWISE) {
                  //pull out the first cubie
                  tempCubie = sections.objectAt(s_index).get('cubies').objectAt(c_index);
                  tempCubie.s_index = s_index;
                  tempCubie.c_index = c_index;

                  //back right cube goes to back left
                  from = [c_index, sidesLength-s_index-1];
                  to = [s_index, c_index];
                  this.swapCubies_old(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  from = [sidesLength-s_index-1, sidesLength-c_index-1];
                  to = [c_index, sidesLength-s_index-1];
                  this.swapCubies_old(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  from = [sidesLength-c_index-1, s_index];
                  to = [sidesLength-s_index-1, sidesLength-c_index-1];
                  this.swapCubies_old(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  to = [sidesLength-c_index-1, s_index];
                  from = [tempCubie.s_index, tempCubie.c_index];
                  delete tempCubie.s_index;
                  delete tempCubie.c_index;

                  sections.objectAt(to[0]).get('cubies').replace(to[1], 1, [tempCubie]);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);
                } else {
                  //pull out the first cubie
                  tempCubie = sections.objectAt(s_index).get('cubies').objectAt(c_index);
                  tempCubie.s_index = s_index;
                  tempCubie.c_index = c_index;

                  from = [sidesLength-c_index-1, s_index];
                  to = [s_index, c_index];
                  this.swapCubies_old(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  from = [sidesLength-s_index-1, sidesLength-c_index-1];
                  to = [sidesLength-c_index-1, s_index];
                  this.swapCubies_old(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  from = [c_index, sidesLength-s_index-1];
                  to = [sidesLength-s_index-1, sidesLength-c_index-1];
                  this.swapCubies_old(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  to = [c_index, sidesLength-s_index-1];
                  from = [tempCubie.s_index, tempCubie.c_index];
                  delete tempCubie.s_index;
                  delete tempCubie.c_index;

                  sections.objectAt(to[0]).get('cubies').replace(to[1], 1, [tempCubie]);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);
                }
              }
            }.bind(this));
          }
        }.bind(this));
        rotation_data.layerView.rerender();
      }

      if(rotation_data.section) {
        sidesLength = 3;
        var rotations = [],
          layer_moves = {},
          section_moves = {
            from: rotation_data.sectionIndex,
            to: rotation_data.sectionIndex
          },
          cubie_moves = {};
        if(rotation_data.axis === AXES.Z) {
          rotation_data.cube.get('data').layers.forEach(function(layer, l_index, layers) {
            if(l_index < sidesLength/2) {
              rotation_data.section.get('data').cubies.forEach(function(cubie, c_index, cubies) {
                if(c_index >= l_index && c_index < (sidesLength - l_index - 1)) {
                  if(rotation_data.direction === ROTATION_DIRECTIONS.CLOCKWISE) {
                    //pull out the first cubie
                    tempCubie = rotation_data.cube.get('data').layers.objectAt(l_index)
                                  .get('data').sections.objectAt(rotation_data.sectionIndex)
                                  .get('data').cubies.objectAt(c_index);

                    layer_moves = { from: c_index, to: l_index };
                    cubie_moves = { from: sidesLength-l_index-1, to: c_index };
                    rotations.push([ layer_moves, section_moves, cubie_moves ]);

                    layer_moves = { from: sidesLength-l_index-1, to: c_index };
                    cubie_moves = { from: sidesLength-c_index-1, to: sidesLength-l_index-1 };
                    rotations.push([ layer_moves, section_moves, cubie_moves ]);

                    layer_moves = { from: sidesLength-c_index-1, to: sidesLength-l_index-1 };
                    cubie_moves = { from: l_index, to: sidesLength-c_index-1 };
                    rotations.push([ layer_moves, section_moves, cubie_moves ]);

                    //special case, the temp cubie is passed in directly
                    tempCubie.from = null;
                    tempCubie.to = l_index;
                    layer_moves = { from: null, to: sidesLength-c_index-1  };
                    rotations.push([ layer_moves, section_moves, tempCubie ]);
                  }
                }
              }.bind(this));
            }
          }.bind(this));
        }
        //perform the moves
        rotations.forEach(function(rotation, r_index, rotations) {
          this.swapCubies(rotation_data, rotation[0], rotation[1], rotation[2]);
        }.bind(this));

        rotation_data.cubeView.rerender();
      }

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