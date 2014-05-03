var Section = DS.Model.extend({
  cubies: DS.hasMany('cubie', {async: true}),
  cube: DS.belongsTo('cube')
});

Section.reopenClass({
  FIXTURES: [
    {
      id: 1,
      cube: 1,
      cubies: [1,2,3,4,5,6,7,8,9]
    },
    {
      id: 2,
      cube: 1,
      cubies: [10,11,12,13,14,15,16,17,18]
    },
    {
      id: 3,
      cube: 1,
      cubies: [19,20,21,22,23,24,25,26,27]
    }

  ]
});

export default Section;