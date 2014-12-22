import Ember from 'ember';
import CubeComponent from './cube';
import { KEYS, ROTATION_DIRECTIONS, ROTATION_TYPES, AXES } from '../constants';

var INITIALIZED = false,
  ANIMATION_PASSTHROUGH = true;

export default CubeComponent.extend({
  classNames: ['interactive'],

  willInsertElement: function() {
    this._super();
    //clear
    this.setProperties({
      'direction': null,
      'steps': []
    });
    this.set('insertedChildView', 0);
  },

  didRender: function() {
    var total = 9;

    if(!INITIALIZED) {
      total = 27;
    }

    if(this.get('insertedChildView') === total) {
      this.set('insertedChildView', 0);
      if(!INITIALIZED) {
        INITIALIZED = true;
        //set the middle cubie as active
        this.setActiveCubieAtIndex(this.get('initialCubieIndex'));
      } else {
        this.setActiveCubieAtIndex(this.get('activeCubieIndex'));
      }
    }
  }.observes('insertedChildView'),

  /**
  Navigate around the cube by changing the active cubie, and the adjacent faces
  */
  navigate: function(data) {
    var min = 0, max = 2,
      cubie,
      positionData,
      activeLayerIndex,
      activeSectionIndex,
      activeCubieIndex;

    cubie = this.get('activeCubie');
    positionData = cubie.get('positionData');
    activeLayerIndex = positionData.layer;
    activeSectionIndex = positionData.section;
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
    //let the model update, then reset the cursor
    Ember.run.schedule('afterRender', this, this.navigate);
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
  TODO: clean this thing up, it seems the opposite of DRY
  */
  keyDown: function(e) {
    var i=0,
      axis = null,
      move = false,
      type = null,
      direction = null,
      rotatingCubies = null,
      aCubie = null,
      self = this;

    if(e.shiftKey && e.altKey) {
      type = ROTATION_TYPES.FULL;
      rotatingCubies = [];
      aCubie = [];
      //rotate cube
      switch(e.keyCode) {
        case KEYS.LEFT:
          move = true;
          axis = AXES.Z;
          direction = ROTATION_DIRECTIONS.CLOCKWISE;
          //get the first cubie of each section
          for(i=0;i<3;i++) {
            aCubie.push(this.getCubieAtIndex((i*3)+1).get('positionData'));
          }
          break;
        case KEYS.RIGHT:
          move = true;
          axis = AXES.Z;
          direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
          for(i=0;i<3;i++) {
            aCubie.push(this.getCubieAtIndex((i*3)+1).get('positionData'));
          }
          break;
        case KEYS.UP:
          move = true;
          axis = AXES.X;
          direction = ROTATION_DIRECTIONS.CLOCKWISE;
          for(i=0;i<3;i++) {
            aCubie.push(this.getCubieAtIndex(i+1).get('positionData'));
          }
          break;
        case KEYS.DOWN:
          move = true;
          axis = AXES.X;
          direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
          for(i=0;i<3;i++) {
            aCubie.push(this.getCubieAtIndex(i+1).get('positionData'));
          }
          break;
      }
    } else {
      aCubie = this.get('activeCubie');
      type = ROTATION_TYPES.PARTIAL;
      if(e.shiftKey && !e.altKey) {
        //rotate Y
        axis = AXES.Y;
        rotatingCubies = this.getYSiblings(aCubie);
        switch(e.keyCode) {
          case KEYS.LEFT:
            move = true;
            direction = ROTATION_DIRECTIONS.CLOCKWISE;
            break;
          case KEYS.RIGHT:
            move = true;
            direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
            break;
        }
      } else if (!e.shiftKey && e.altKey) {
        //rotate X & Z
        switch(e.keyCode) {
          case KEYS.LEFT:
            move = true;
            axis = AXES.Z;
            rotatingCubies = this.getZSiblings(aCubie);
            direction = ROTATION_DIRECTIONS.CLOCKWISE;
            break;
          case KEYS.RIGHT:
            move = true;
            axis = AXES.Z;
            rotatingCubies = this.getZSiblings(aCubie);
            direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
            break;
          case KEYS.UP:
            move = true;
            axis = AXES.X;
            rotatingCubies = this.getXSiblings(aCubie);
            direction = ROTATION_DIRECTIONS.CLOCKWISE;
            break;
          case KEYS.DOWN:
            move = true;
            axis = AXES.X;
            rotatingCubies = this.getXSiblings(aCubie);
            direction = ROTATION_DIRECTIONS.ANTICLOCKWISE;
            break;
        }
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
      
      this.$().one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        Ember.run(function() {
          if(ANIMATION_PASSTHROUGH) {
            ANIMATION_PASSTHROUGH = false;
            self.sendAction('move', {
              cube: self.cube.get('id'),
              type: type,
              positionData: aCubie.get('positionData'),
              rotatingCubies: rotatingCubies,
              direction: direction,
              axis: axis
            });
            //Ember.run.schedule('afterRender', self, 'rerender');
          } else {
            ANIMATION_PASSTHROUGH = true;
          }
        });
      });
    }
  }
});