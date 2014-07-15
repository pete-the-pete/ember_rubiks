import { FACES } from '../constants';
import { KEYS } from '../constants';

var INITIALIZED = false;

export default Ember.Component.extend({
  activeRow: 0,
  activeCol: 0,

  //is it a perf issue to have an object instead of a primitive?
  activeLayer: null,
  activeSection: null,
  activeCubie: null,

  didInsertElement: function() {
    //hack to highlight it after everything as loaded (hopefully)
    if(!INITIALIZED) {
      INITIALIZED = true;
      Ember.run.later(this, function() {
        //set the middle cubie as active
        this.setActiveLayerAtIndex(0);
        this.setActiveSectionAtIndex(1);
        this.setActiveCubieAtIndex(1);
      }, 1000);
    }
  },

  setActiveLayer: function(layer) {
    this.set('activeLayer', layer);
  },

  setActiveSection: function(section) {
    this.set('activeSection', section);
  },

  setActiveCubie: function(cubie) {
    this.set('activeCubie', cubie);
  },

  /**
  Sects the activeLayer
  */
  setActiveLayerAtIndex: function(index) {
    this.set('activeLayer', this.get('cube.layers').objectAt(index));
  },

  /**
  Sets the active section at the index of the active layer.
  */
  setActiveSectionAtIndex: function(index) {
    this.set('activeSection', this.get('activeLayer').get('sections').objectAt(index));
  },

  /**
  Sets the active cubie at the index of the active seciton
  */
  setActiveCubieAtIndex: function(index) {
    this.set('activeCubie', this.get('activeSection').get('cubies').objectAt(index));
  },

  actions: {
    move: function(data) {
      this.sendAction('move', data);
    }
  }


  /*setActiveCubies: function(isActive) {
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
    this.setActiveCubies(true);
  },
  clearMoves: function() {
    this.setActiveCubies(false);
  },*/


  /*keyDown: function(e) {
      var activeRow = this.get('activeRow'),
        activeCol = this.get('activeCol');

      if(e.shiftKey) {
        //moves
        switch(e.keyCode) {
          case KEYS.UP:
          case KEYS.RIGHT:
            //rotate something...the layer?
            var layer = this.$().find('.layer').eq(activeRow)
            layer.addClass('rotateY anticlockwise step-1');
            break;
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
        //set the highlight to be in the next run loop
        Ember.run.next(this, this.highlightMoves);
      }


      //if(dir) {
      //    this.get('controller').send('rotateCube', { direction: dir });
      //}
  }*/
});