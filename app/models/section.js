var row = DS.Model.extend({
  cubies: DS.hasMany('cubie'),
  cube: DS.belongsTo('cube')
});

export default row;