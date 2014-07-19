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
  swapCubies: function(rotation_data, sections, from, to) {
    sections.objectAt(to[0]).get('cubies').replace(to[1], 1,
      [sections.objectAt(from[0]).get('cubies').objectAt(from[1])]);
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
                  this.swapCubies(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  from = [sidesLength-s_index-1, sidesLength-c_index-1];
                  to = [c_index, sidesLength-s_index-1];
                  this.swapCubies(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  from = [sidesLength-c_index-1, s_index];
                  to = [sidesLength-s_index-1, sidesLength-c_index-1];
                  this.swapCubies(rotation_data, sections, from, to);
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
                  this.swapCubies(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  from = [sidesLength-s_index-1, sidesLength-c_index-1];
                  to = [sidesLength-c_index-1, s_index];
                  this.swapCubies(rotation_data, sections, from, to);
                  this.rotateCubieColors(sections.objectAt(to[0]).get('cubies').objectAt(to[1]), rotation_data);

                  from = [c_index, sidesLength-s_index-1];
                  to = [sidesLength-s_index-1, sidesLength-c_index-1];
                  this.swapCubies(rotation_data, sections, from, to);
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
        rotation_data.layerView.scheduleRerender();
      }
    },
    handleRotation: function(data) {
      console.log(data);
    }
  }
});