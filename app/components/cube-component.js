import { FACES } from '../constants';
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
    var max = this.get('childViews').get('length') - 1,
      activeCubieIndex = this.get('activeCubie').get('index');

    //save this off for the rerender
    this.set('navigationData', data);

    //if we don't have the data, just highlight the same cube, but we
    //need to reset everything since the childViews have been destroyed
    //and recreated
    if(!data) {
      this.setActiveCubieAtIndex(this.get('activeCubieIndex'));
      return;
    }

    switch(data.key) {
      case KEYS.UP:
        //already at the top
        if(activeCubieIndex < 8) {
          if(activeCubieIndex > 2) {
            activeCubieIndex -= 3;
          }
        } else {
          activeCubieIndex -= 9;
        }
        break;
      case KEYS.DOWN:
        if(activeCubieIndex < 8) {
          if(activeCubieIndex < 6) {
            activeCubieIndex += 3;
          } else {
            activeCubieIndex += 9;
          }
        } else if(activeCubieIndex < 19) {
          activeCubieIndex += 9;
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
            activeSectionIndex++
          }
        }
        break;
      /*case KEYS.RIGHT:
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
        break;*/
    }
    console.debug(activeCubieIndex);
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