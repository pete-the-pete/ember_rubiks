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
    side:'left',
    color: colors.orange
  },
  {
    side:'back',
    color: colors.green
  },
  {
    side:'right',
    color: colors.red
  },
  {
    side:'front',
    color: colors.yellow
  },
  {
    side:'top',
    color: colors.white
  },
  {
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
  PARTIAL: 'partial',
  FULL: 'full'
};

export var FACES = faces;
export var FACES_TOO = faces;
export var FACES_INDECES = face_index;
export var KEYS = keys;
export var ROTATION_DIRECTIONS = rotation_directions;
export var ROTATION_TYPES = rotation_types;
export var COLORS_MAP = colors;
export var COLORS_LIST = Object.keys(colors);
export var AXES =  rotation_axis;
