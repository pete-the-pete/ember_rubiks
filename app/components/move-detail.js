import Ember from 'ember';

export default Ember.Component.extend({
  moveDescription: function() {
    //names from: http://ruwix.com/the-rubiks-cube/notation/
    //IF ever using flex sizing (whatever its called?), use ::first-letter trick (needs to be display block)
    //and an ::after to put the ' if anticlockwise
    var slice,
      cubie_slices = ['Left', 'Middle', 'Right'],
      section_slices = ['Back', 'Standing', 'Front'],
      layer_slices = ['Upper', 'Equator', 'Down'],
      move = this.get('move'),
      axis = move.get('axis'),
      type = move.get('type'),
      positionData = move.get('positionData');

    if(type === 'partial') {
      switch(axis) {
        case 'X':
          //use cubies
          slice = cubie_slices[positionData.cubie];
          break;
        case 'Y':
          //use layer
          slice = layer_slices[positionData.layer];
          break;
        case 'Z':
          //use section
          slice = section_slices[positionData.section];
          break;
      }
    } else {
      slice = axis;
    }

    if(slice) {
      return slice + ' ' + move.get('direction');
    } else {
      return '';
    }
  }.property('move.axis')
});