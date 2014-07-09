import startApp from '../helpers/start-app';

var App,
  $layers,
  delay = 250;

module('Rotations - Layers', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    App.reset();
  }
});

function resetLayer() {
  return new Promise(function(resolve) {
    $layers.attr('class','layer');
    Ember.run.later(App, resolve, delay);
  });
}

function performVisualConfirmation(rotation, direction) {
  return function() {
    return new Promise(function(resolve) {
      $layers
        .addClass(rotation)
        .addClass(direction)
        .addClass('step-2');
      Ember.run.later(App, resolve, delay);
    });
  };
}

//All these tests are visual for now, there isn't actually any programmatic validation

asyncTest('layers can rotate', function() {
  expect(0);
  visit('/')
    .then(function() {
      $layers = $('#cube .layer');
      performVisualConfirmation('rotateY', 'anticlockwise')()
      .then(resetLayer)
      .then(performVisualConfirmation('rotateY', 'clockwise'))
      .then(resetLayer)
      .then(start);
    });
});