
export default Ember.View.extend({
  didInsertElement: function() {
      // brings the view into focus in order to capture keyUps.
      // there are a few ways to handle this, this is just one.
      return this.$().attr({ tabindex: 1 }), this.$().focus();
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