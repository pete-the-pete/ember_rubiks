var Cube = DS.Model.extend({
  title: DS.attr('string'),
  layers: DS.hasMany('layer', {async: true}),
  isSolved: DS.attr('boolean', {defaultValue: false})
});

Cube.reopenClass({
  FIXTURES: [
      {
        id: 1,
        title: 'i am a wild pig',
        isSolved: false,
        layers: [1,2,3]
      }
    ]
  });
export default Cube;