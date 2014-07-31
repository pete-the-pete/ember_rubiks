import { KEYS } from '../constants';

var INITIALIZED = false;

export default Ember.Component.extend({

  navigationData: null,

  activeLayer: null,
  activeSection: null,
  activeCubie: null,

  activeLayerIndex: null,
  activeSectionIndex: null,
  activeCubieIndex: null,

  //TODO: these should come from the model
  initialLayerIndex: 0,
  initialSectionIndex: 1,
  initialCubieIndex: 1,

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
    this.set('activeLayerIndex', index);
    this.set('activeLayer', this.get('childViews').objectAt(index));
  },

  /**
  Sets the active section at the index of the active layer.
  */
  setActiveSectionAtIndex: function(index) {
    this.set('activeSectionIndex', index);
    this.set('activeSection', this.get('activeLayer').get('childViews').objectAt(index));
  },

  /**
  Sets the active cubie at the index of the active seciton
  */
  setActiveCubieAtIndex: function(index) {
    this.set('activeCubieIndex', index);
    this.set('activeCubie', this.get('activeSection').get('childViews').objectAt(index));
  },

  updateAdjacentFaces: function() {

  },

  /**
  Navigate around the cube by changing the active cubie, and the adjacent faces
  */
  navigate: function(data) {
    var max = this.get('childViews').get('length') - 1,
      activeLayerIndex = this.get('activeLayer').get('index'),
      activeSectionIndex = this.get('activeSection').get('index'),
      activeCubieIndex = this.get('activeCubie').get('index');

    //save this off for the rerender
    this.set('navigationData', data);

    //if we don't have the data, just highlight the same cube, but we
    //need to reset everything since the childViews have been destroyed
    //and recreated
    if(!data) {
      this.setActiveLayerAtIndex(this.get('activeLayerIndex'));
      this.setActiveSectionAtIndex(this.get('activeSectionIndex'));
      this.setActiveCubieAtIndex(this.get('activeCubieIndex'));
      return;
    }

    switch(data.key) {
      case KEYS.UP:
        //already at the top
        if(activeLayerIndex === 0) {
          if(activeSectionIndex > 0) {
            activeSectionIndex--;
          }
        } else {
          activeLayerIndex--;
        }
        break;
      case KEYS.DOWN:
        if(activeLayerIndex === 0) {
          if(activeSectionIndex < max) {
            ++activeSectionIndex;
          } else {
            activeLayerIndex++;
          }
        } else if(activeLayerIndex < max) {
          activeLayerIndex++;
        }
        break;
      case KEYS.LEFT:
        if(activeLayerIndex === 0) {
          if(activeCubieIndex > 0) {
            activeCubieIndex--;
          }
        } else if (activeSectionIndex === max) {
          if(activeCubieIndex > 0) {
            activeCubieIndex--;
          }
        } else {
          if(activeSectionIndex < max) {
            activeSectionIndex++;
          }
        }
        break;
      case KEYS.RIGHT:
        //moving on the top or front, just move right
        if(activeLayerIndex === 0) {
          if(activeCubieIndex < max) {
            activeCubieIndex++;
          } else {
            activeLayerIndex++;
          }
        } else if(activeSectionIndex === max) {
          if(activeCubieIndex < max) {
            activeCubieIndex++;
          } else {
            activeSectionIndex--;
          }
        } else {
          if(activeSectionIndex > 0) {
            activeSectionIndex--;
          }
        }
        break;
    }
    this.setActiveLayerAtIndex(activeLayerIndex);
    this.setActiveSectionAtIndex(activeSectionIndex);
    this.setActiveCubieAtIndex(activeCubieIndex);
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