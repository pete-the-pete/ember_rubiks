import { ROTATION_DIRECTIONS } from '../constants';

export default Ember.ArrayController.extend({

  /**
  * Swap cubies in a section.  The to and from
  * are arrays with the form [section,cubie].
  **/
  swapCubies: function(direction, sections, from, to) {
    sections.objectAt(to[0]).get('cubies').replace(to[1], 1,
      [sections.objectAt(from[0]).get('cubies').objectAt(from[1])]);
  },

  actions: {
    handleMove: function(data) {
      var to = [],
        from = [],
        sidesLength = 3,
        tempCubie = null;

      if(data.layer) {
        //we're rotating a layer
        data.layer.get('data').sections.forEach(function(section, s_index, sections) {
          //go halfway through
          if(s_index < sidesLength/2) {
            section.get('data').cubies.forEach(function(cubie, c_index, cubies) {
              if(c_index <= s_index && c_index < (sidesLength - s_index - 1)) {

                if(data.direction === ROTATION_DIRECTIONS.CLOCKWISE) {
                  //pull out the first cubie
                  tempCubie = sections.objectAt(s_index).get('cubies').objectAt(c_index);
                  tempCubie.s_index = s_index;
                  tempCubie.c_index = c_index;

                  from = [c_index, sidesLength-s_index-1];
                  to = [s_index, c_index];
                  this.swapCubies(data.direction, sections, from, to);

                  from = [sidesLength-s_index-1, sidesLength-c_index-1];
                  to = [c_index, sidesLength-s_index-1];
                  this.swapCubies(data.direction, sections, from, to);

                  from = [sidesLength-c_index-1, s_index];
                  to = [sidesLength-s_index-1, sidesLength-c_index-1];
                  this.swapCubies(data.direction, sections, from, to);

                  to = [sidesLength-c_index-1, s_index];
                  from = [tempCubie.s_index, tempCubie.c_index];
                  delete tempCubie.s_index;
                  delete tempCubie.c_index;

                  sections.objectAt(to[0]).get('cubies').replace(to[1], 1, [tempCubie]);
                } else {
                  //pull out the first cubie
                  tempCubie = sections.objectAt(s_index).get('cubies').objectAt(c_index);
                  tempCubie.s_index = s_index;
                  tempCubie.c_index = c_index;

                  from = [sidesLength-c_index-1, s_index];
                  to = [s_index, c_index];
                  this.swapCubies(data.direction, sections, from, to);

                  from = [sidesLength-s_index-1, sidesLength-c_index-1];
                  to = [sidesLength-c_index-1, s_index];
                  this.swapCubies(data.direction, sections, from, to);

                  from = [c_index, sidesLength-s_index-1];
                  to = [sidesLength-s_index-1, sidesLength-c_index-1];
                  this.swapCubies(data.direction, sections, from, to);

                  to = [c_index, sidesLength-s_index-1];
                  from = [tempCubie.s_index, tempCubie.c_index];
                  delete tempCubie.s_index;
                  delete tempCubie.c_index;

                  sections.objectAt(to[0]).get('cubies').replace(to[1], 1, [tempCubie]);
                }
              }
            }.bind(this));
          }
        }.bind(this));

        var index = data.cube.get('data').layers.indexOf(data.layer);
        data.cube.get('data').layers.removeAt(index);
        Ember.run.next(this, function() {
          data.cube.get('data').layers.insertAt(index, data.layer);
        })
      }
    },
    handleRotation: function(data) {
      console.log(data);
    }
  }
});