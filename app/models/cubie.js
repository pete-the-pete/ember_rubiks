var Cubie = DS.Model.extend({
  row: DS.attr('string'),
  col: DS.attr('string'),
  section: DS.belongsTo('section'),
  faces: DS.hasMany('face', {async: true})
});

//convenience constants
var LEFT = 1,
  BACK = 2,
  RIGHT = 3,
  FRONT = 4,
  TOP = 5,
  BOTTOM =6;

Cubie.reopenClass({
  FIXTURES: [
    {
      id:1,
      section:1,
      row: 'row-1',
      col: 'col-1',
      faces:[LEFT,BACK,TOP]
    },
    {
      id:2,
      section:1,
      row: 'row-1',
      col: 'col-2',
      faces:[BACK, TOP]
    },
    {
      id:3,
      section:1,
      row: 'row-1',
      col: 'col-3',
      faces:[BACK,RIGHT,TOP]
    },
    {
      id:4,
      section:1,
      row: 'row-2',
      col: 'col-1',
      faces:[LEFT,TOP]
    },
    {
      id:5,
      section:1,
      row: 'row-2',
      col: 'col-2',
      faces:[TOP]
    },
    {
      id:6,
      section:1,
      row: 'row-2',
      col: 'col-3',
      faces:[RIGHT, TOP]
    },
    {
      id:7,
      section:1,
      row: 'row-3',
      col: 'col-1',
      faces:[LEFT, FRONT, TOP]
    },
    {
      id:8,
      section:1,
      row: 'row-3',
      col: 'col-2',
      faces:[FRONT, TOP]
    },
    {
      id:9,
      section:1,
      row: 'row-3',
      col: 'col-3',
      faces:[RIGHT, FRONT, TOP]
    }
  ]
})

export default Cubie;