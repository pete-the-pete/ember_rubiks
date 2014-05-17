import startApp from '../helpers/start-app';

var App, $sectionCubies;

module('Rotations - Sections', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    App.reset();
  }
});

function resetLayer() {
  return new Promise(function(resolve) {
    $sectionCubies.attr('class','cubie');
    Ember.run.later(App, resolve, 2500);
  });
}

function performVisualConfirmation(rotation, direction) {
  return function() {
    return new Promise(function(resolve) {
      $sectionCubies
        .addClass(rotation)
        .addClass(direction)
        .addClass('step-1');
      Ember.run.later(App, resolve, 2500);
    });
  };
}

//All these tests are visual for now, there isn't actually any programmatic validation

asyncTest('front face can rotate', function() {
  expect(0);
  visit('/')
    .then(function() {
      $sectionCubies = $('div.section:last-of-type .cubie');
      performVisualConfirmation('rotateZ', 'anticlockwise')()
      .then(resetLayer)
      .then(performVisualConfirmation('rotateZ', 'clockwise'))
      .then(resetLayer)
    });
});

asyncTest('left face can rotate', function() {
  expect(0);
  visit('/')
    .then(function() {
      $layers = $('#cube .layer');
      performVisualConfirmation('rotateZ', 'anticlockwise')()
      .then(resetLayer)
      .then(performVisualConfirmation('rotateZ', 'clockwise'))
      .then(resetLayer)
    });
});