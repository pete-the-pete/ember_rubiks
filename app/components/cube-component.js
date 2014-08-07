import Ember from 'ember';
import { KEYS, ROTATION_DIRECTIONS, ROTATION_TYPES, AXES } from '../constants';

var INITIALIZED = false;


export default Ember.Component.extend({
  classNames: ['cube'],

  cubies: Ember.computed.alias('cube.data.cubies'),

  activeCubie: null,

  activeCubieIndex: null,

  //TODO: these should come from the model
  initialCubieIndex: 4,

  didInsertElement: function() {
    //hack to highlight it after everything as loaded (hopefully)
    Ember.run.later(this, function() {
      if(!INITIALIZED) {
        INITIALIZED = true;
        //set the middle cubie as active
        this.setActiveCubieAtIndex(this.get('initialCubieIndex'));
      } else {
        this.setActiveCubieAtIndex(this.get('activeCubieIndex'));
      }
      //reset the cursor
      this.navigate();
    }, 500);
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

  getXSiblings: function() {
    var index = this.get('activeCubie').get('positionData').cubie;
    return this.get('childViews').filter(function(cubie) {
      var c_index = cubie.get('positionData').cubie;
      //brute force, return the cubie if it matches one of its nine siblings, including itself
      return c_index === index || //itself
        c_index === index + 3 || c_index === index - 3 || //next cubie over
        c_index === index + 6 || c_index === index - 6 || //two cubies over, or the next diagonal
        c_index === index + 9 || c_index === index - 9 || //one cubie above or below, or the next next diagonal
        c_index === index + 12 || c_index === index - 12 || //diagonal
        c_index === index + 15 || c_index === index - 15 || //diagonal
        c_index === index + 18 || c_index === index - 18 || //two above or below
        c_index === index + 21 || c_index === index - 21; //diagonal
    });
  },

  getYSiblings: function() {
    var layer = this.get('activeCubie').get('positionData').layer;

    return this.get('childViews').filter(function(cubie) {
      return cubie.get('positionData').layer === layer;
    });
  },

  getZSiblings: function() {
    var section = this.get('activeCubie').get('positionData').section;

    return this.get('childViews').filter(function(cubie) {
      return cubie.get('positionData').section === section;
    });
  },

  /**
  Navigate around the cube by changing the active cubie, and the adjacent faces
  */
  navigate: function(data) {
    var min = 0, max = 2,
      cubie = this.get('activeCubie'),
      positionData = cubie.get('positionData'),
      activeLayerIndex = positionData.layer,
      activeSectionIndex = positionData.section,
      activeCubieIndex = positionData.index;

    //if we don't have the data, just highlight the same cube, but we
    //need to reset everything since the childViews have been destroyed
    //and recreated
    if(!data) {
      this.setActiveCubieAtIndex(this.get('activeCubieIndex'));
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
    navigate: function(data) {
      this.navigate(data);
    }
  },

  keyDown: function(e) {
    var axis = null,
      move = false,
      direction = null,
      XCubies = null,
      YCubies = null,
      ZCubies = null;

    if(e.shiftKey && !e.altKey) {
      //rotate Y
      axis = AXES.Y;
      YCubies = this.getYSiblings();
      switch(e.keyCode) {
        case KEYS.LEFT:
          move = true;
          direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
          break;
        case KEYS.RIGHT:
          move = true;
          direction = ROTATION_DIRECTIONS.CLOCKWISE;
          break;
      }
    } else if (!e.shiftKey && e.altKey) {
      //rotate X & Z
      switch(e.keyCode) {
        case KEYS.LEFT:
          move = true;
          axis = AXES.Z;
          ZCubies = this.getZSiblings();
          direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
          break;
        case KEYS.RIGHT:
          move = true;
          axis = AXES.Z;
          ZCubies = this.getZSiblings();
          direction = ROTATION_DIRECTIONS.CLOCKWISE;
          break;
        case KEYS.UP:
          move = true;
          axis = AXES.X;
          XCubies = this.getXSiblings();
          direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
          break;
        case KEYS.DOWN:
          move = true;
          axis = AXES.X;
          XCubies = this.getXSiblings();
          direction = ROTATION_DIRECTIONS.CLOCKWISE;
          break;
      }

    } else if(e.shiftKey && e.altKey) {
      //rotate cube
    }

    if(move) {
      switch(axis) {
        case AXES.X:
          XCubies.forEach(function(cubie) {
            cubie.setProperties({
              'axis': axis,
              'direction': direction,
              'steps':['step']
            });
          });
          break;
        case AXES.Y:
          YCubies.forEach(function(cubie) {
            cubie.setProperties({
              'axis': axis,
              'direction': direction,
              'steps':['step']
            });
          });
          break;
        case AXES.Z:
          ZCubies.forEach(function(cubie) {
            cubie.setProperties({
              'axis': axis,
              'direction': direction,
              'steps':['step']
            });
          });
          break;
      }
      //let the animation happen, then change the cubies
      Ember.run.later(this, function() {
        this.sendAction('move', {
          cube: this.cube,
          type: ROTATION_TYPES.PARTIAL,
          positionData: this.get('activeCubie').get('positionData'),
          direction: direction,
          axis: axis
        });

        //let the model update, then reset the cursor
        Ember.run.scheduleOnce('afterRender', this, function() {
          this.navigate();
        });
      }, 250);
    }
  }
});