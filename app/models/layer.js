var Layer = DS.Model.extend({
  sections: DS.hasMany('section', {async: true}),
  cube: DS.belongsTo('cube')
});

Layer.reopenClass({
  FIXTURES: [
    {
      id: 1,
      cube: 1,
      sections: [1,2,3]
    }/*,
    {
      id: 2,
      cube: 1,
      sections: [10,11,12,13,14,15,16,17,18]
    },
    {
      id: 3,
      cube: 1,
      sections: [19,20,21,22,23,24,25,26,27]
    }*/
  ]
});

export default Layer;