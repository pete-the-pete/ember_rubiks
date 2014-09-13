import Ember from 'ember';
import CubieComponent from './cubie';
export default CubieComponent.extend({

	displayFace: Ember.computed.filter('cubie.faces', function(currFace) {
		return currFace.id === this.get('face').id;
	})
});