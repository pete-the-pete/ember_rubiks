import DS from 'ember-data';
import { FACES } from '../constants';

var Face = DS.Model.extend({
  side: DS.attr('string'),
  color: DS.attr('string')
});

Face.reopenClass({
  FIXTURES: FACES
});

export default Face;