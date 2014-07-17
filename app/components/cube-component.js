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
});