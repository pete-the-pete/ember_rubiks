import { FACES } from '../constants';

var Cubie = DS.Model.extend({
  faces: DS.attr()
});

var CUBIES = (function() {
  var cubies = [];
  for(var i=1;i<=27;i++) {
    cubies.push({
      id: i,
      faces: Ember.copy(FACES, true)
    })
  }
  return cubies;
})();

Cubie.reopenClass({
  FIXTURES: CUBIES
});

export default Cubie;