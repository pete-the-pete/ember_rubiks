var faces = [
  {
    id:1,
    side:'left',
    color:'orange',
    facing: 'internal'
  },
  {
    id:2,
    side:'back',
    color:'green',
    facing: 'internal'
  },
  {
    id:3,
    side:'right',
    color:'red',
    facing: 'internal'
  },
  {
    id:4,
    side:'front',
    color:'yellow',
    facing: 'internal'
  },
  {
    id:5,
    side:'top',
    color:'white',
    facing: 'internal'
  },
  {
    id:6,
    side:'bottom',
    color:'blue',
    facing: 'internal'
  }
];

var keys = {
  LEFT: 37,
  DOWN: 40,
  RIGHT: 39,
  UP: 38
};

var rotation_directions = {
  CLOCKWISE: 'clockwise',
  ANTICLOCKWISE: 'anticlockwise'
}

export var FACES = faces;
export var KEYS = keys;
export var ROTATION_DIRECTIONS = rotation_directions;
