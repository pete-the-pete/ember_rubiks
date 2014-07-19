import { FACES } from '../constants';
import { KEYS } from '../constants';

var INITIALIZED = false;

export default Ember.Component.extend({
  layerViews: null,

  activeLayer: null,
  activeSection: null,
  activeCubie: null,

  initialLayerIndex: 0,
  initialSectionIndex: 1,
  initialCubieIndex: 1,

  createLayers: function() {
    this.set('layerViews', Ember.ArrayProxy.create({content: []}));
  }.on('init'),

  registerLayer: function(layer) {
    this.get('layerViews').pushObject(layer);
  },


  didInsertElement: function() {
    //hack to highlight it after everything as loaded (hopefully)
    if(!INITIALIZED) {
      INITIALIZED = true;
      Ember.run.later(this, function() {
        //set the middle cubie as active
        this.setActiveLayerAtIndex(this.get('initialLayerIndex'));
        this.setActiveSectionAtIndex(this.get('initialSectionIndex'));
        this.setActiveCubieAtIndex(this.get('initialCubieIndex'));
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
    this.set('activeLayer', this.get('layerViews').objectAt(index));
  },

  /**
  Sets the active section at the index of the active layer.
  */
  setActiveSectionAtIndex: function(index) {
    this.set('activeSection', this.get('activeLayer').get('sectionViews').objectAt(index));
  },

  /**
  Sets the active cubie at the index of the active seciton
  */
  setActiveCubieAtIndex: function(index) {
    this.set('activeCubie', this.get('activeSection').get('cubieViews').objectAt(index));
  },

  updateAdjacentFaces: function() {

  },

  /**
  Navigate around the cube by changing the active cubie, and the adjacent faces
  */
  navigate: function(data) {
    var activeLayerIndex = this.get('activeLayer').get('index'),
      activeSectionIndex = this.get('activeSection').get('index'),
      activeCubieIndex = this.get('activeCubie').get('index');
    switch(data.key) {
      case KEYS.UP:
        //already at the top
        if(activeLayerIndex === 0) {
          if(activeSectionIndex > 0) {
            this.setActiveSectionAtIndex(--activeSectionIndex);
          }
        } else {
          this.setActiveLayerAtIndex(--activeLayerIndex);
          this.setActiveSectionAtIndex(activeSectionIndex);
        }
        //keep the same active cubie index
        this.setActiveCubieAtIndex(activeCubieIndex);
        break;
      case KEYS.DOWN:
        //debugger;
        if(activeLayerIndex === 0) {
          if(activeSectionIndex < 2) {
            this.setActiveSectionAtIndex(++activeSectionIndex);
          } else {
            this.setActiveLayerAtIndex(++activeLayerIndex);
            this.setActiveSectionAtIndex(activeSectionIndex);
          }
        } else if(activeLayerIndex < 2) {
          this.setActiveLayerAtIndex(++activeLayerIndex);
          this.setActiveSectionAtIndex(activeSectionIndex);
        }
        //keep the same active cubie index
        this.setActiveCubieAtIndex(activeCubieIndex);
        break;
      case KEYS.LEFT:
        break;
      case KEYS.RIGHT:
        break;
    }
  },

  actions: {
    move: function(data) {
      this.sendAction('move', data);
    },
    navigate: function(data) {
      this.navigate(data);
    }
  }
});