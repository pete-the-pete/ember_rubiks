var Cube = DS.Model.extend({
  sections: DS.hasMany('section', {async: true}),
  isSolved: DS.attr('boolean', {defaultValue: false})
});

Cube.reopenClass({
  FIXTURES: [
      {
        id: 1,
        isSolved: false,
        sections: [1]
      }
    ]
  });

/*{
  id: 1,
    cube:1,
  cubies: [
  {
    id:1,
    section:1,
    faces:[
      {
        id:1,
        side: 'left',
        color: 'orange',

      },
      {
        id:2,
        side: 'back',
        color: 'green'
      }
    ]
  }
]
}*/

export default Cube;