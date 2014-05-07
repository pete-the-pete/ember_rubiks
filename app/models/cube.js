var Cube = DS.Model.extend({
  title: DS.attr('string'),
  sections: DS.hasMany('section', {async: true}),
  isSolved: DS.attr('boolean', {defaultValue: false})
});

Cube.reopenClass({
  FIXTURES: [
      {
        id: 1,
        title: 'i am a wild pig',
        isSolved: false,
        sections: [1]//,2,3]
      }
    ]
  });
export default Cube;