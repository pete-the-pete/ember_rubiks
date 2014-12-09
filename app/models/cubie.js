import Ember from 'ember';
import DS from 'ember-data';

var Cubie = DS.Model.extend({
  faces: DS.attr(),
  cube: DS.belongsTo('cube', {async: true})
});

export default Cubie;