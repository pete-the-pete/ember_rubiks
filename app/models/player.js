import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  created: DS.attr('date'),
  lastLogin: DS.attr('date'),
  email: DS.attr('string'),
  isGuest: DS.attr(),
  games: DS.hasMany('game')
});
