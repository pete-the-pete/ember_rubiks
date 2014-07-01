import { FACES } from '../constants';

export default Ember.Component.extend({
  activeRow: 1,
  activeCol: 1,
  layers: function() {
    return this.get('cube.layers.content.content');
  }.property('cube.@each.layers'),
  sections: function() {
    return this.get('cube.layers.sections.content.content');
  }.property('cube.@each.layers.@each.sections'),
  init: function() {
    this._super();
  },

  didInsertElement: function() {
    return this.$().attr({ tabindex: 1 }), this.$().focus();
  },
  highlightActiveSections: function() {
  },
  keyDown: function(e) {
      var dir;
      console.debug(e);

      // if(e.shiftKey) {
      //   switch(e.keyCode) {
      //     case DOWN:
      //     default:
      //     break;
      //   } === 38) dir = -1;
      // else if(e.keyCode === 40) dir = 1;

      // if(dir) {
      //     this.get('controller').send('rotateCube', { direction: dir });
      // }
  }
});