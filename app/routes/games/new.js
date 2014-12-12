import { FACES } from '../../constants';

export default Ember.Route.extend({
  //TODO: this should be moved somewhere else, maybe a
  //utils, or as part of one of the cube model
  generateCube: function() {
    var cubie,
      cubies = [];
    for(var i=1; i<=27; i++) {
      cubie = this.store.createRecord('cubie', {
        faces: Ember.copy(FACES, true)
      });
      cubies.pushObject(cubie);
      cubie.save();
    }
    
    var Cube = this.store.createRecord('cube', {
      isSolved: false
    });
    Cube.get('cubies').pushObjects(cubies);
    Cube.save();
    return Cube;
  },

  model: function(params, transition) {
    //Create a new cube for the new game, and set it to the player
    var player = this.store.all('player').findBy('id', transition.params.player.player_id);
    var cube = this.generateCube();
    var game = this.store.createRecord('game', {
      cube: cube,
      player: player
    }).save();
    return game;

  },
  afterModel: function(game, transition) {
    this.replaceWith('game', game);
  }
});
