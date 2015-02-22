Candy.Preloader = function(game){
	// define width and height of the game
	Candy.GAME_WIDTH = 640;
	Candy.GAME_HEIGHT = 960;
	this.background = null;
	this.preloadBar = null;
};
Candy.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = 'ffffff';
		this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite((Candy.GAME_WIDTH - 289) / 2, (Candy.GAME_HEIGHT - 45 + 230) / 2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/background.png');
		this.load.image('alan-cover', 'img/alan-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('button-restart', 'img/button-restart.png');
		// load spritesheets
		this.load.spritesheet('candy', 'img/candy.png', 82, 98);
		// this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};