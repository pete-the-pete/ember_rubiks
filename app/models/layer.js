var Layer = DS.Model.extend({
  sections: DS.hasMany('section', {async: true}),
  cube: DS.belongsTo('cube'),
  title: DS.attr('string')
});

Layer.reopenClass({
  FIXTURES: [
    {
      id: 1,
      cube: 1,
      sections: [1,2,3]
    },
    {
      id: 2,
      cube: 1,
      sections: [4,5,6]
    },
    {
      id: 3,
      cube: 1,
      sections: [7,8,9]
    }
  ]
});

export default Layer;