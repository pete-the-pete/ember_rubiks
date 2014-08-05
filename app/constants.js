var colors = {
  orange: 'orange',
  green: 'green',
  red: 'red',
  yellow: 'yellow',
  white: 'white',
  blue: 'blue'
};

var faces = [
  {
    id:1,
    side:'left',
    color: colors.orange
  },
  {
    id:2,
    side:'back',
    color: colors.green
  },
  {
    id:3,
    side:'right',
    color: colors.red
  },
  {
    id:4,
    side:'front',
    color: colors.yellow
  },
  {
    id:5,
    side:'top',
    color: colors.white
  },
  {
    id:6,
    side:'bottom',
    color: colors.blue
  }
];

var face_index = {
  LEFT: 0,
  BACK: 1,
  RIGHT: 2,
  FRONT: 3,
  TOP: 4,
  BOTTOM: 5
};

var keys = {
  LEFT: 37,
  DOWN: 40,
  RIGHT: 39,
  UP: 38
};



var rotation_directions = {
  CLOCKWISE: 'clockwise',
  ANTICLOCKWISE: 'anticlockwise'
};

var rotation_axis = {
  X: 'X',
  Y: 'Y',
  Z: 'Z'
};

var rotation_types = {
  partial: 'partial',
  full: 'full'
};

export var FACES = faces;
export var FACE_INDEX = face_index;
export var KEYS = keys;
export var ROTATION_DIRECTIONS = rotation_directions;
export var ROTATION_TYPES = rotation_types;
export var COLORS_MAP = colors;
export var COLORS_LIST = Object.keys(colors);
export var AXES =  rotation_axis;
