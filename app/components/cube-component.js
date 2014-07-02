import { FACES } from '../constants';
import { KEYS } from '../constants';

export default Ember.Component.extend({
  activeRow: 0,
  activeCol: 0,
  didInsertElement: function() {
    //hack to highlight it after everything as loaded (hopefully)
    Ember.run.later(this, this.highlightMoves, 1000);
    this.$().attr({ tabindex: 1 }), this.$().focus();
  },
  getActiveLayer: function() {
    return this.get('cube.layers').objectAt(this.get('activeRow'));
  },
  highlightMoves: function() {
    var layer = this.getActiveLayer(),
      col = this.get('activeCol');

    //highlight the full layer
    layer.get('sections').forEach(function(section, index, sections) {
      section.get('cubies').forEach(function(cubie, index, cubies) {
        cubie.set('isActive', true);
      });
    });

    //highlight the column of each layer
    this.get('cube.layers').forEach(function(layer, index, layers) {
      layer.get('sections').forEach(function(section, index, sections) {
        section.get('cubies').objectAt(col).set('isActive', true);
      })
    });
  },
  keyDown: function(e) {
      var dir;
      this.highlightMoves();

      // if(e.shiftKey) {
      //   switch(e.keyCode) {
      //     case DOWN:
      //     default:
      //     break;
      //   } === 38) dir = -1;
      // else if(e.keyCode === 40) dir = 1;

      // if(dir) {
      //     this.get('controller').send('rotateCube', { direction: dir });
      // }
  }
});