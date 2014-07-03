import { FACES } from '../constants';
import { KEYS } from '../constants';

export default Ember.Component.extend({
  activeRow: 0,
  activeCol: 0,
  didInsertElement: function() {
    //hack to highlight it after everything as loaded (hopefully)
    Ember.run.later(this, this.highlightMoves, 1000);
    this.$().attr({ tabindex: 1 });
    this.$().focus();
  },
  setActiveCubes: function(isActive) {
    var layer = this.getActiveLayer(),
      sectionCubies = this.getActiveSectionCubies();

    //highlight the full layer
    layer.get('sections').forEach(function(section, index, sections) {
      section.get('cubies').forEach(function(cubie, index, cubies) {
        cubie.set('isActive', isActive);
      });
    });

    //highlight the column of each layer
    sectionCubies.forEach(function(cubie, index, cubies) {
      cubie.set('isActive', isActive);
    });
  },
  getActiveLayer: function() {
    return this.get('cube.layers').objectAt(this.get('activeRow'));
  },
  getActiveSectionCubies: function() {
    var col = this.get('activeCol');
    return this.get('cube.layers').reduce(function(all_cubies, layer, index, layers) {
      return all_cubies.concat(layer.get('sections').reduce(function(section_cubies, section, index, sections) {
        section_cubies.push(section.get('cubies').objectAt(col));
        return section_cubies;
      }, []));
    }, []);
  },
  highlightMoves: function() {
    this.setActiveCubes(true);
  },
  clearMoves: function() {
    this.setActiveCubes(false);
  },
  keyDown: function(e) {
      var activeRow = this.get('activeRow'),
        activeCol = this.get('activeCol');

      if(e.shiftKey) {
        //moves
        switch(e.keyCode) {
          case KEYS.UP:
          case KEYS.RIGHT:
          case KEYS.DOWN:
          case KEYS.LEFT:
          break;
        }
      } else {
        //changing the selection
        switch(e.keyCode) {
          case KEYS.UP:
            activeRow = (activeRow - 1 >= 0) ? --activeRow : 2;
            break;
          case KEYS.DOWN:
            activeRow = (activeRow + 1 <= 2) ? ++activeRow : 0;
            break;
          case KEYS.LEFT:
            activeCol = (activeCol - 1 >= 0) ? --activeCol : 2;
            break;
          case KEYS.RIGHT:
            activeCol = (activeCol + 1 <= 2) ? ++activeCol : 0;
            break;
        }

        //unset the current active moves before updating
        this.clearMoves();
        this.set('activeRow', activeRow);
        this.set('activeCol', activeCol);
        Ember.run.next(this, this.highlightMoves);
      }


      /*if(dir) {
          this.get('controller').send('rotateCube', { direction: dir });
      }*/
  }
});