var Cubie = DS.Model.extend({
  section: DS.belongsTo('section'),
  faces: DS.hasMany('face', {async: true})
});

Cubie.reopenClass({
  FIXTURES: [
    {
      id:1,
      section:1,
      faces:[1,2,3,4,5,6]
    }
  ]
})

export default Cubie;