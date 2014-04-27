var face = DS.Model.extend({
  side: DS.attr('string'),
  color: DS.attr('string'),
  cubies: DS.hasMany('cubie')
});

export default face;