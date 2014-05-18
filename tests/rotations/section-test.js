import startApp from '../helpers/start-app';

var App, 
  $sectionCubies, 
  delay = 250,
  callCount = 0;

module('Rotations - Sections', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    App.reset();
  }
});

function resetCubies() {
  return new Promise(function(resolve) {
    $sectionCubies.attr('class','cubie');
    Ember.run.later(App, resolve, delay);
  });
}

function performVisualConfirmation(rotation, direction) {
  return function() {
    return new Promise(function(resolve) {
      var step = ++callCount % 5;
      
      $sectionCubies
        .addClass(rotation)
        .addClass(direction);

      if(callCount <= 4) {
        $sectionCubies.addClass('step-'+step);
      } else {
        $sectionCubies.removeClass('step-' + (4 - step));
      }
      Ember.run.later(App, resolve, delay);
    });
  };
}

//All these tests are visual for now, there isn't actually any programmatic validation

asyncTest('faces can rotate', function() {
  expect(0);
  visit('/')
    .then(function() {
      $sectionCubies = $('div.section:last-of-type .cubie');
      //wind up
      performVisualConfirmation('rotateZ', 'anticlockwise')()
      .then(performVisualConfirmation('rotateZ', 'anticlockwise'))
      .then(performVisualConfirmation('rotateZ', 'anticlockwise'))
      .then(performVisualConfirmation('rotateZ', 'anticlockwise'))
      //unwind
      .then(performVisualConfirmation('rotateZ', 'anticlockwise'))
      .then(performVisualConfirmation('rotateZ', 'anticlockwise'))
      .then(performVisualConfirmation('rotateZ', 'anticlockwise'))
      .then(performVisualConfirmation('rotateZ', 'anticlockwise'))
      .then(resetCubies)
      .then(function() {
        console.debug('it happened');
        callCount = 0;
        $sectionCubies = $('div.section div.cubie:first-of-type');
        //wind up
        performVisualConfirmation('rotateX', 'anticlockwise')()
        .then(performVisualConfirmation('rotateX', 'anticlockwise'))
        .then(performVisualConfirmation('rotateX', 'anticlockwise'))
        .then(performVisualConfirmation('rotateX', 'anticlockwise'))
        //unwind
        .then(performVisualConfirmation('rotateX', 'anticlockwise'))
        .then(performVisualConfirmation('rotateX', 'anticlockwise'))
        .then(performVisualConfirmation('rotateX', 'anticlockwise'))
        .then(performVisualConfirmation('rotateX', 'anticlockwise'));
      });
    });
});