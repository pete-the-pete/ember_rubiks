import Ember from 'ember';
import CubeComponent from './cube';
import { KEYS, ROTATION_DIRECTIONS, ROTATION_TYPES, AXES } from '../constants';

var INITIALIZED = false;

export default CubeComponent.extend({
  classNames: ['interactive'],

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
      this.get('activeCubie').setFocus();
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

  /**
  * Actions to capture events from sub-components
  */
  actions: {
    navigate: function(data) {
      this.navigate(data);
    }
  },

  /**
  Moves and rotations are handled by the cube directly.
  */
  keyDown: function(e) {
    var axis = null,
      move = false,
      direction = null,
      rotatingCubies = null;

    if(e.shiftKey && e.altKey) {
      //rotate cube
      switch(e.keyCode) {
        case KEYS.LEFT:
          direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
          break;
        case KEYS.RIGHT:
          direction = ROTATION_DIRECTIONS.CLOCKWISE;
          break;
        case KEYS.UP:
          direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
          break;
        case KEYS.DOWN:
          direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
          break;
      }
    } else {
      if(e.shiftKey && !e.altKey) {
        //rotate Y
        axis = AXES.Y;
        rotatingCubies = this.getYSiblings();
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
            rotatingCubies = this.getZSiblings();
            direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
            break;
          case KEYS.RIGHT:
            move = true;
            axis = AXES.Z;
            rotatingCubies = this.getZSiblings();
            direction = ROTATION_DIRECTIONS.CLOCKWISE;
            break;
          case KEYS.UP:
            move = true;
            axis = AXES.X;
            rotatingCubies = this.getXSiblings();
            direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
            break;
          case KEYS.DOWN:
            move = true;
            axis = AXES.X;
            rotatingCubies = this.getXSiblings();
            direction = ROTATION_DIRECTIONS.CLOCKWISE;
            break;
        }
      }

      if(move) {
        rotatingCubies.forEach(function(cubie) {
          cubie.setProperties({
            'axis': axis,
            'direction': direction,
            'steps':['step']
          });
        });
        //let the animation happen, then change the cubies
        Ember.run.later(this, function() {
          this.get('activeCubie').rerender();
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
  }
});