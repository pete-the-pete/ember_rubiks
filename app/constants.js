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
}

export var FACES = faces;
export var KEYS = keys;
export var ROTATION_DIRECTIONS = rotation_directions;
export var COLORS_MAP = colors;
export var COLORS_LIST = Object.keys(colors);
export var AXES =  rotation_axis;
