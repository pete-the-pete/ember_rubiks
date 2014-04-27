var Cubie = DS.Model.extend({
  section: DS.hasMany('section'),
  faces: DS.hasMany('face')
});

export default Cubie;