import Ember from 'ember';
import { KEYS } from '../constants';

var INITIALIZED = false;

export default Ember.Component.extend({
  classNames: ['cube'],

  navigationData: null,

  activeCubie: null,

  activeCubieIndex: null,

  //TODO: these should come from the model
  initialCubieIndex: 4,

  didInsertElement: function() {
    //hack to highlight it after everything as loaded (hopefully)
    if(!INITIALIZED) {
      INITIALIZED = true;
      Ember.run.later(this, function() {
        //set the middle cubie as active
        this.setActiveCubieAtIndex(this.get('initialCubieIndex'));
      }, 500);
    }
  },

  setActiveCubie: function(cubie) {
    this.set('activeCubie', cubie);
  },

  /**
  Sets the active cubie at the index of the active seciton
  */
  setActiveCubieAtIndex: function(index) {
    this.set('activeCubieIndex', index);
    this.set('activeCubie', this.get('childViews').objectAt(index));
  },

  /**
  Navigate around the cube by changing the active cubie, and the adjacent faces
  */
  navigate: function(data) {
    var min = 1, max = 3,
      cubie = this.get('activeCubie'),
      activeLayerIndex = cubie.get('_layerIndex'),
      activeSectionIndex = cubie.get('_sectionIndex'),
      activeCubieIndex = cubie.get('index');

    //save this off for the rerender
    this.set('navigationData', data);

    //if we don't have the data, just highlight the same cube, but we
    //need to reset everything since the childViews have been destroyed
    //and recreated
    if(!data) {
      this.setActiveCubieAtIndex(activeCubieIndex);
      return;
    }

    switch(data.key) {
      case KEYS.UP:
        if(activeLayerIndex === min) {
          if(activeSectionIndex > min) {
            //move towards the back if we are at the top
            activeCubieIndex -= 3;
          }
        } else {
          //move up a layer otherwise
          activeCubieIndex -= 9;
        }
        break;
      case KEYS.DOWN:
        if(activeLayerIndex === min) {
          if(activeSectionIndex < max) {
            //move toward the front if we are at the top
            activeCubieIndex += 3;
          } else {
            //move down a layer otherwise
            activeCubieIndex += 9;
          }
        } else if(activeLayerIndex < max) {
          //move down a layer
          activeCubieIndex += 9;
        }
        break;
      case KEYS.LEFT:
        if(activeLayerIndex === min || activeSectionIndex === max) {
          //move left along the top and front
          if((activeCubieIndex+1) % 3 !== 1) {
            activeCubieIndex--;
          }
        } else {
          if(activeSectionIndex < max) {
            //move forward along the right
            activeCubieIndex += 3;
          }
        }
        break;
      case KEYS.RIGHT:
        if(activeLayerIndex === min) {
          //moving right along the top and front
          if((activeCubieIndex+1) % 3 !== 0) {
            activeCubieIndex++;
          } else {
            activeCubieIndex += 9;
          }
        } else if(activeSectionIndex === max) {
          //moving right along the front, until the right edge, then move back
          if((activeCubieIndex+1) % 3 !== 0) {
            activeCubieIndex++;
          } else {
            activeCubieIndex -= 3;
          }
        } else {
          if(activeSectionIndex > min) {
            activeCubieIndex -= 3;
          }
        }
        break;
    }
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