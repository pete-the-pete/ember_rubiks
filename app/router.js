import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

/**
* Nested routes so that I can have a header with links to other
* functionality that is always present.
*
* http://emberjs.com/guides/routing/defining-your-routes/
* http://ugisozols.com/blog/2013/11/05/understanding-nesting-in-emberjs/
* http://hashrocket.com/blog/posts/ember-routing-the-when-and-why-of-nesting
*/
Router.map(function() {
  this.resource('guest', function() {
    this.route('new');
  });
  this.resource('player', { path: 'players/:player_id' }, function() {
    this.resource('games', function() {
      this.route('new');
      this.resource('game', { path: ':game_id' });
    });

  });

});

export default Router;