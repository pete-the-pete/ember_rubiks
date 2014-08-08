import Ember from 'ember';
import CubeComponent from './cube';

export default CubeComponent.extend({
  classNames: ['flat'],

  topCubies: function() {
    console.debug('this.get(\'cubies\').objectAt(0)', this.get('cubies').objectAt(0));
    return [this.get('cubies').objectAt(0)];
  }.property('cubies[]'),

  leftCubies: function() {
    console.debug('this.get(\'cubies\').objectAt(0)', this.get('cubies').objectAt(0));
    return [this.get('cubies').objectAt(0)];
  }.property('cubies[]'),

  backCubies: function() {
    console.debug('this.get(\'cubies\').objectAt(0)', this.get('cubies').objectAt(0));
    return [this.get('cubies').objectAt(0)];
  }.property('cubies[]'),

  rightCubies: function() {
    console.debug('this.get(\'cubies\').objectAt(0)', this.get('cubies').objectAt(0));
    return [this.get('cubies').objectAt(0)];
  }.property('cubies[]'),

  bottomCubies: function() {
    console.debug('this.get(\'cubies\').objectAt(0)', this.get('cubies').objectAt(0));
    return [this.get('cubies').objectAt(0)];
  }.property('cubies[]')
});