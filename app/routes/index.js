export default Ember.Route.extend({
  model: function() {
    "use strict";
    console.group('trying to load the model');
    return this.store.find('cube').then(function(cubes) {
      console.log('cubes: ', cubes);
      cubes.forEach(function(cube) {
        console.log('cube: ', cube);
        return cube.get('layers').then(function(layers) {
          console.log('layers: ', layers);
          layers.forEach(function(layer) {
            console.log('layer: ', layer);
            return layer.get('sections').then(function(sections) {
              console.log('sections: ', sections);
              sections.forEach(function(section) {
                console.log('section: ', section);
                return section.get('cubies');
              })
            });
          });
        });
      });
      console.groupEnd();
    });
  }
});
