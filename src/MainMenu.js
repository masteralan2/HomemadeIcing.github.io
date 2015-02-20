FB.init({
  appId: '340313659509218',
  frictionlessRequests: true,
  status: true,
  version: 'v2.1'
});

FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
FB.Event.subscribe('auth.statusChange', onStatusChange);

Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		this.add.sprite((Candy.GAME_WIDTH-395)/2, 60, 'title');
		// add the button that will start the game
		this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};