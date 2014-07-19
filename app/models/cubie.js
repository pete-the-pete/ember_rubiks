import { FACES } from '../constants';

var Cubie = DS.Model.extend({
  section: DS.belongsTo('section'),
  faces: DS.attr()
});

Cubie.reopenClass({
  FIXTURES: [
    {
      id:1,
      section:1,
      faces: Ember.copy(FACES, true)
    },
    {
      id:2,
      section:1,
      faces: Ember.copy(FACES, true)
    },
    {
      id:3,
      section:1,
      faces: Ember.copy(FACES, true)
    },
    {
      id:4,
      section:2,
      faces: Ember.copy(FACES, true)
    },
    {
      id:5,
      section:2,
      faces: Ember.copy(FACES, true)
    },
    {
      id:6,
      section:2,
      faces: Ember.copy(FACES, true)
    },
    {
      id:7,
      section:3,
      faces: Ember.copy(FACES, true)
    },
    {
      id:8,
      section:3,
      faces: Ember.copy(FACES, true)
    },
    {
      id:9,
      section:3,
      faces: Ember.copy(FACES, true)
    },
    {
      id:10,
      section:4,
      faces: Ember.copy(FACES, true)
    },
    {
      id:11,
      section:4,
      faces: Ember.copy(FACES, true)
    },
    {
      id:12,
      section:4,
      faces: Ember.copy(FACES, true)
    },
    {
      id:13,
      section:5,
      faces: Ember.copy(FACES, true)
    },
    {
      id:14,
      section:5,
      faces:[]
    },
    {
      id:15,
      section:5,
      faces: Ember.copy(FACES, true)
    },
    {
      id:16,
      section:6,
      faces: Ember.copy(FACES, true)
    },
    {
      id:17,
      section:6,
      faces: Ember.copy(FACES, true)
    },
    {
      id:18,
      section:6,
      faces: Ember.copy(FACES, true)
    },
    {
      id:19,
      section:7,
      faces: Ember.copy(FACES, true)
    },
    {
      id:20,
      section:7,
      faces: Ember.copy(FACES, true)
    },
    {
      id:21,
      section:7,
      faces: Ember.copy(FACES, true)
    },
    {
      id:22,
      section:8,
      faces: Ember.copy(FACES, true)
    },
    {
      id:23,
      section:8,
      faces: Ember.copy(FACES, true)
    },
    {
      id:24,
      section:8,
      faces: Ember.copy(FACES, true)
    },
    {
      id:25,
      section:9,
      faces: Ember.copy(FACES, true)
    },
    {
      id:26,
      section:9,
      faces: Ember.copy(FACES, true)
    },
    {
      id:27,
      section:9,
      faces: Ember.copy(FACES, true)
    }
  ]
});

export default Cubie;