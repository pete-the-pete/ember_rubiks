var Section = DS.Model.extend({
  cubies: DS.hasMany('cubie', {async: true}),
  cube: DS.belongsTo('cube')
});

Section.reopenClass({
  FIXTURES: [
    {
      id: 1,
      cube: 1,
      cubies: [1]
    }
  ]
});

export default Section;