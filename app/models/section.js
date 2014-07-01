var Section = DS.Model.extend({
  cubies: DS.hasMany('cubie', {async: true}),
  layer: DS.belongsTo('layer'),
  title: DS.attr('string')
});

Section.reopenClass({
  FIXTURES: [
    {
      id: 1,
      layer: 1,
      title: 'where are you waldo?',
      cubies: [1,2,3]
    },
    {
      id: 2,
      layer: 1,
      cubies: [4,5,6]
    },
    {
      id: 3,
      layer: 1,
      cubies: [7,8,9]
    },
    {
      id: 4,
      cube: 1,
      cubies: [10,11,12]
    },
    {
      id: 5,
      cube: 1,
      cubies: [13,14,15]
    },
    {
      id: 6,
      cube: 1,
      cubies: [16,17,18]
    },
    {
      id: 7,
      cube: 1,
      cubies: [19,20,21]
    },
    {
      id: 8,
      cube: 1,
      cubies: [22,23,24]
    },
    {
      id: 9,
      cube: 1,
      cubies: [25,26,27]
    }

  ]
});

export default Section;