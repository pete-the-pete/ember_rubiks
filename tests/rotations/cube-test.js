import startApp from '../helpers/start-app';

var App,
  delay = 2500;

/* 
TODO: maybe use this, or something like it, later to programmatically verify the rotations occured
NOTE: this would need to be ported/included for each type of rotation (cube, layer, section)
function getComputedAnimationStyles($el) {
  var computed = window.getComputedStyle($el.get(0)),
    key = Array.prototype.reduce.call(computed, function(initial, current, index, array) {
      if(current.match(/^.*transform$/)) {
        initial = current;
      }
      return initial;
    });

  return computed.getPropertyValue();
}*/

module('Rotations - Cube', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    App.reset();
  }
});

function resetCube() {
  return new Promise(function(resolve) {
    $('#cube').attr('class',"");
    Ember.run.later(App, resolve, delay);
  });
}

function performVisualConfirmation(rotation, direction) {
  return function() {
    return new Promise(function(resolve) {
      $("#cube")
        .addClass(rotation)
        .addClass(direction)
        .addClass('step-2');
      Ember.run.later(App, resolve, delay);
    });
  };
}

//All these tests are visual for now, there isn't actually any programmatic validation

asyncTest('cube can rotate', function() {
  expect(0);
  visit('/')
    .then(performVisualConfirmation('rotateX', 'anticlockwise'))
    .then(resetCube)
    .then(performVisualConfirmation('rotateX', 'clockwise'))
    .then(resetCube)
    .then(performVisualConfirmation('rotateY', 'anticlockwise'))
    .then(resetCube)
    .then(performVisualConfirmation('rotateY', 'clockwise'))
    .then(resetCube)
    .then(performVisualConfirmation('rotateZ', 'anticlockwise'))
    .then(resetCube)
    .then(performVisualConfirmation('rotateZ', 'clockwise'))
    .then(resetCube)
    .then(start);
});