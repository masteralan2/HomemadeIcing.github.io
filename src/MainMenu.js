Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-170, Candy.GAME_HEIGHT - 514 + 20, 'alan-cover');
		this.add.sprite(Candy.GAME_WIDTH - 395 - 5, 140, 'title');
		// add the button that will start the game
		this.buttonStart = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
		this.buttonAlanWebsite = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 143 - 130 - 130 - 3, 'button-alans-website', this.alansWebsite, this, 1, 0, 2);
		this.buttonAlanWebsite.scale = {
      x: 0.75,
      y: 0.75
    };
    this.buttonStart.input.useHandCursor = true;
    this.buttonAlanWebsite.input.useHandCursor = true;
    this.add.tween(this.buttonStart).to({
      x: Candy.GAME_WIDTH - 401 - 10
    }, 1000, Phaser.Easing.Exponential.Out, true, 0, false);
    this.add.tween(this.buttonAlanWebsite).to({
      x: Candy.GAME_WIDTH - 268 - 15
    }, 1000, Phaser.Easing.Exponential.Out, true, 200, false);
	},
	initAudio: function() {
		storageAPI.initUnset('audio', false);
	},

	startGame: function() {
		// start the Game state
		// if (this.audioStatus) {
		// 	this.soundClick.play()
		// }
		// this.audioStatus = false;
		// this.audioOffset = 0;
		// this.soundMusic.stop();
		this.state.start('Game');
	},

	alansWebsite: function() {
		// if(this.audioStatus) {
		// 	this.soundClick.play()
		// }
		window.top.open('http://homemadeicing.github.io')
	}
};