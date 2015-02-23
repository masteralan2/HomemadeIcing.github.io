Candy.Preloader = function(game) {
  this.background = null;
  this.preloadBar = null;
  Candy.GAME_WIDTH = 640;
  Candy.GAME_HEIGHT = 960
};
Candy.Preloader.prototype = {
  preload: function() {
    this.stage.backgroundColor = '#B4D9E7';
    this.add.sprite(0, 0, 'preloaderBackground');
    this.preloadBar = this.add.sprite((Candy.GAME_WIDTH - 289) / 2, (Candy.GAME_HEIGHT - 45 + 230) / 2, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
    this.load.image('background', 'img/background.png');
    this.load.image('floor', 'img/floor.png');
    this.load.image('monster-cover', 'img/monster-cover.png');
    this.load.image('title', 'img/title.png');
    this.load.image('explosion', 'img/explosion.png');
    this.load.image('score-bg', 'img/score-bg.png');
    this.load.image('monster-sleeps', 'img/monster-sleeps.png');
    this.load.image('screen-overlay', 'img/screen-overlay.png');
    this.load.image('screen-achievements', 'img/screen-achievements.png');
    this.load.image('screen-completed', 'img/screen-completed.png');
    this.load.image('text-paused', 'img/text-paused.png');
    this.load.image('text-gameover', 'img/text-gameover.png');
    this.load.image('text-highscore', 'img/text-highscore.png');
    this.load.image('text-overall', 'img/text-overall.png');
    this.load.image('text-newbestscore', 'img/text-newbestscore.png');
    this.load.image('message-newcandy', 'img/message-newcandy.png');
    this.load.image('candy-red', 'img/candy-red.png');
    this.load.image('candy-marshmallow', 'img/candy-marshmallow.png');
    this.load.image('candy-jelly', 'img/candy-jelly.png');
    this.load.image('candy-donut', 'img/candy-donut.png');
    this.load.image('candy-cupcake', 'img/candy-cupcake.png');
    this.load.image('candy-pink', 'img/candy-pink.png');
    this.load.image('candy-lollipop', 'img/candy-lollipop.png');
    this.load.image('candy-icecream', 'img/candy-icecream.png');
    this.load.image('candy-teddy', 'img/candy-teddy.png');
    this.load.image('candy-cake', 'img/candy-cake.png');
    this.load.image('candy-chocolate', 'img/candy-chocolate.png');
    this.load.image('candy-super', 'img/candy-super.png');
    this.load.image('candy-bomb', 'img/candy-bomb.png');
    this.load.image('achievement-marshmallow', 'img/achievement-marshmallow.png');
    this.load.image('achievement-jelly', 'img/achievement-jelly.png');
    this.load.image('achievement-donut', 'img/achievement-donut.png');
    this.load.image('achievement-cupcake', 'img/achievement-cupcake.png');
    this.load.image('achievement-pink', 'img/achievement-pink.png');
    this.load.image('achievement-lollipop', 'img/achievement-lollipop.png');
    this.load.image('achievement-icecream', 'img/achievement-icecream.png');
    this.load.image('achievement-teddy', 'img/achievement-teddy.png');
    this.load.image('achievement-cake', 'img/achievement-cake.png');
    this.load.image('achievement-chocolate', 'img/achievement-chocolate.png');
    this.load.image('achievement-super', 'img/achievement-super.png');
    this.load.image('achievement-cape', 'img/achievement-cape.png');
    this.load.image('achievement-crown', 'img/achievement-crown.png');
    this.load.image('achievement-win', 'img/achievement-win.png');
    this.load.image('life-full', 'img/life-full.png');
    this.load.image('life-empty', 'img/life-empty.png');
    this.load.text('font-ttf', 'fonts/comicbook.ttf');
    this.load.text('font-svg', 'fonts/comicbook.svg');
    this.load.text('font-woff', 'fonts/comicbook.woff');
    this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
    this.load.spritesheet('button-alanswebsite', 'img/button-alans-website.png', 358, 133);
    this.load.spritesheet('button-continue', 'img/button-continue.png', 358, 133);
    this.load.spritesheet('button-back', 'img/button-back.png', 358, 133);
    this.load.spritesheet('button-restart', 'img/button-restart.png', 363, 131);
    this.load.spritesheet('button-achievements', 'img/button-achievements.png', 363, 131);
    this.load.spritesheet('button-audio', 'img/button-audio.png', 111, 96);
    this.load.spritesheet('button-pause', 'img/button-pause.png', 96, 98);
    this.load.spritesheet('killmarker', 'img/killmarker.png', 83, 83);
    this.load.spritesheet('monster-basic-idle', 'img/monster-basic-idle.png', 103, 131);
    this.load.spritesheet('monster-basic-eats', 'img/monster-basic-eats.png', 111, 136);
    this.load.spritesheet('monster-crown-idle', 'img/monster-crown-idle.png', 103, 144);
    this.load.spritesheet('monster-crown-eats', 'img/monster-crown-eats.png', 127, 136);
    this.load.spritesheet('monster-cape-idle', 'img/monster-cape-idle.png', 148, 127);
    this.load.spritesheet('monster-cape-eats', 'img/monster-cape-eats.png', 148, 136);
    this.load.spritesheet('monster-king-idle', 'img/monster-king-idle.png', 148, 144);
    this.load.spritesheet('monster-king-eats', 'img/monster-king-eats.png', 148, 136);
    this.load.audio('audio-click', ['audio/click.ogg', 'audio/click.mp3']);
    this.load.audio('audio-eating', ['audio/eating.ogg', 'audio/eating.mp3']);
    this.load.audio('audio-music', ['audio/music.ogg', 'audio/music.mp3']);
    this.load.audio('audio-newlevel', ['audio/newlevel.ogg', 'audio/newlevel.mp3'])
  },
  create: function() {
    this.state.start('MainMenu')
  }
};