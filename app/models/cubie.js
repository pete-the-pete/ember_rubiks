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
    },
    {
      id:10,
      section:2,
      row: 'row-1',
      col: 'col-1',
      faces:[LEFT,BACK]
    },
    {
      id:11,
      section:2,
      row: 'row-1',
      col: 'col-2',
      faces:[BACK]
    },
    {
      id:12,
      section:2,
      row: 'row-1',
      col: 'col-3',
      faces:[BACK,RIGHT]
    },
    {
      id:13,
      section:2,
      row: 'row-2',
      col: 'col-1',
      faces:[LEFT]
    },
    {
      id:14,
      section:2,
      row: 'row-2',
      col: 'col-2',
      faces:[]
    },
    {
      id:15,
      section:2,
      row: 'row-2',
      col: 'col-3',
      faces:[RIGHT]
    },
    {
      id:16,
      section:2,
      row: 'row-3',
      col: 'col-1',
      faces:[LEFT, FRONT]
    },
    {
      id:17,
      section:2,
      row: 'row-3',
      col: 'col-2',
      faces:[FRONT]
    },
    {
      id:18,
      section:2,
      row: 'row-3',
      col: 'col-3',
      faces:[RIGHT, FRONT]
    },
    {
      id:19,
      section:3,
      row: 'row-1',
      col: 'col-1',
      faces:[LEFT, BACK, BOTTOM]
    },
    {
      id:20,
      section:3,
      row: 'row-1',
      col: 'col-2',
      faces:[BACK, BOTTOM]
    },
    {
      id:21,
      section:3,
      row: 'row-1',
      col: 'col-3',
      faces:[BACK, RIGHT, BOTTOM]
    },
    {
      id:22,
      section:3,
      row: 'row-2',
      col: 'col-1',
      faces:[LEFT, BOTTOM]
    },
    {
      id:23,
      section:3,
      row: 'row-2',
      col: 'col-2',
      faces:[BOTTOM]
    },
    {
      id:24,
      section:3,
      row: 'row-2',
      col: 'col-3',
      faces:[RIGHT, BOTTOM]
    },
    {
      id:25,
      section:3,
      row: 'row-3',
      col: 'col-1',
      faces:[LEFT, FRONT, BOTTOM]
    },
    {
      id:26,
      section:3,
      row: 'row-3',
      col: 'col-2',
      faces:[FRONT, BOTTOM]
    },
    {
      id:27,
      section:3,
      row: 'row-3',
      col: 'col-3',
      faces:[RIGHT, FRONT, BOTTOM]
    }
  ]
})

export default Cubie;