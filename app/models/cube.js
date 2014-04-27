var cube = DS.Model.extend({
  sections: DS.hasMany('section'),
  isSolved: DS.attr('boolean', {defaultValue: false})
});

cube.reopenClass({
  FIXTURES: [
      {
        id: 1,
        isSolved: false,
        sections: []
      }
    ]
  });

export default cube;