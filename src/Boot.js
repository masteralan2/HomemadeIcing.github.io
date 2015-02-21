var Candy = {};
Candy.Boot = function(game){};
Candy.Boot.prototype = {
	preload: function(){
		// preload the loading indicator first before anything else
		this.load.image('preloaderBar', 'img/loading-bar.png');
		// added the preloader background to look pretty
		this.load.image('preloaderBackground', 'img/screen-loading.png');
		// added a image to remind user to screen rotate
		this.load.image('screenRotate', 'img/screen-rotate.png')
	},
	create: function(){
		// set scale options
		this.input.maxPointers = 2;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//if its not a desktop and isn't in landscape on mobile
		if (!this.game.device.desktop && !this.isFFOS) {
			this.scale.forceOrientation(true, false, 'screenRotate')
		}
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		// start the Preloader state
		this.state.start('Preloader');
	},
	//in the phaser cdn file, you can check the navigator (the device the user is using) to see 
	//if the user is using mobile. You can be more specifc like say 'iphone', or 'android'.

	isFFOS: function() {
    return (!!"mozApps" in navigator && navigator.userAgent.search("Mobile")) != -1
  }
};