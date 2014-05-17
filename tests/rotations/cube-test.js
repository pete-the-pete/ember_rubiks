import startApp from '../helpers/start-app';

var App;

function getComputedAnimationStyles($el) {
  var computed = window.getComputedStyle($el.get(0)),
    key = Array.prototype.reduce.call(computed, function(initial, current, index, array) {
      if(current.match(/^.*transform$/)) {
        initial = current;
      }
      return initial;
    });

  return computed.getPropertyValue();
}

module('Rotations - Cube', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    App.reset();
  }
});

function resetCube() {  
  $('#cube').attr('class',"");
}

function performVisualConfirmation(rotation, direction) {
  $("#cube")
    .addClass(rotation)
    .addClass(direction)
    .addClass('step-2');
}

//All these tests are visual for now, there isn't actually any programmatic validation

asyncTest('cube can rotate', function() {
  expect(0);
  visit('/').then(function() {
    new Promise(function(resolve, reject) {
      performVisualConfirmation('rotateX', 'anticlockwise');
      Ember.run.later(this, resolve, 1000);
    }).then(function(resolve, reject) {
      resetCube();
      //Ember.run.later(this, resolve, 1000);
    }).then(function(resolve, reject) {
      performVisualConfirmation('rotateX', 'clockwise');
      Ember.run.later(this, resovle, 1000);
    });
      /*.then(resetCube)
      .then(function() {
        performVisualConfirmation('rotateY', 'anticlockwise');
      })
      .then(resetCube)
      .then(function() {
        performVisualConfirmation('rotateY', 'clockwise');
      });*/
  });
});

/*test('cube can rotateY clockwise', function() {
  expect(0);
  visit('/').then(function() {
    performVisualConfirmation('rotateY', 'clockwise');
  });
});

test('cube can rotateY anticlockwise', function() {
  expect(0);
  visit('/').then(function() {
    performVisualConfirmation('rotateY', 'anticlockwise');
  });
});

test('cube can rotateZ clockwise', function() {
  expect(0);
  visit('/').then(function() {
    performVisualConfirmation('rotateZ', 'clockwise');
  });
});

test('cube can rotateZ anticlockwise', function() {
  expect(0);
  visit('/').then(function() {
    performVisualConfirmation('rotateZ', 'anticlockwise');
  });
});
*/