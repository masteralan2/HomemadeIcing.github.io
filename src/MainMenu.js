FB.init({
  appId: '340313659509218',
  frictionlessRequests: true,
  status: true,
  version: 'v2.1'
});

FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
FB.Event.subscribe('auth.statusChange', onStatusChange);

// Place following code after FB.init call.

function onLogin(response) {
  if (response.status == 'connected') {
    FB.api('/me?fields=first_name', function(data) {
      var welcomeBlock = document.getElementById('fb-welcome');
      welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
    });
  }
}

FB.getLoginStatus(function(response) {
  // Check login status on load, and if the user is
  // already logged in, go directly to the welcome message.
  if (response.status == 'connected') {
    onLogin(response);
  } else {
    // Otherwise, show Login dialog first.
    FB.login(function(response) {
      onLogin(response);
    }, {scope: 'user_friends, email'});
  }
});

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