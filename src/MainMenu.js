Candy.MainMenu = function(game) {
  blackmoonButton = null;
  enclaveButton = null;
  audioStatus = false;
  audioOffset = 0;
  soundClick = null;
  soundMusic = null
};
Candy.MainMenu.prototype = {
  create: function() {
    this.add.sprite(0, 0, 'background');
    this.add.sprite(-170, Candy.GAME_HEIGHT - 514 + 20, 'monster-cover');
    highscoreTxt = this.add.sprite(10, 140, 'text-highscore');
    highscoreBg = this.add.sprite(5, 210, 'score-bg');
    highscoreText = this.add.text(150, 252, "0", {
      font: "36px ComicBook",
      fill: "#FFCC00"
    });
    highscoreText.anchor.setTo(0.5, 0.5);
    highscoreText.x = (213 + 75 - highscoreText.width) * 0.5;
    overallTxt = this.add.sprite(10, 310, 'text-overall');
    overallBg = this.add.sprite(5, 360, 'score-bg');
    totalscoreText = this.add.text(150, 402, "0", {
      font: "36px ComicBook",
      fill: "#FFCC00"
    });
    totalscoreText.anchor.setTo(0.5, 0.5);
    totalscoreText.x = (213 + 75 - totalscoreText.width) * 0.5;
    var title = this.add.sprite(Candy.GAME_WIDTH - 395 - 5, 140, 'title');
    this.buttonStart = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 143 - 10, 'button-start', this.clickStart, this, 1, 0, 2);
    this.buttonMoreGames = this.add.button(Candy.GAME_WIDTH - 300, Candy.GAME_HEIGHT - 440, 'button-alanswebsite', this.clickAlansWebsite, this, 1, 0, 2);
    this.buttonAchievements = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 143 - 130 - 20, 'button-achievements', this.clickAchievements, this, 1, 0, 2);

    this.buttonAudio = this.add.button(Candy.GAME_WIDTH - 111 - 10, -96, 'button-audio', this.manageAudio, this, 1, 0, 2);
    this.buttonStart.input.useHandCursor = true;
    this.buttonMoreGames.input.useHandCursor = true;
    this.buttonAchievements.input.useHandCursor = true;
    this.buttonAudio.input.useHandCursor = true;
    storageAPI.initUnset('highscore', 0);
    var highscore = storageAPI.get('highscore');
    highscoreText.setText(highscore);
    storageAPI.initUnset('totalscore', 0);
    var totalscore = storageAPI.get('totalscore');
    totalscoreText.setText('' + totalscore);
    this.initAudio();
    this.add.tween(this.buttonStart).to({
      x: Candy.GAME_WIDTH - 401 - 10
    }, 1000, Phaser.Easing.Exponential.Out, true, 0, false);
    this.add.tween(this.buttonAchievements).to({
      x: Candy.GAME_WIDTH - 363 - 10
    }, 1000, Phaser.Easing.Exponential.Out, true, 100, false);
    this.add.tween(this.buttonMoreGames).to({
      x: Candy.GAME_WIDTH - 380
    }, 1000, Phaser.Easing.Exponential.Out, true, 200, false);
    this.add.tween(this.buttonAudio).to({
      y: 10
    }, 1000, Phaser.Easing.Bounce.Out, true, 100, false);
    highscoreText.alpha = 0;
    highscoreTxt.alpha = 0;
    highscoreBg.alpha = 0;
    totalscoreText.alpha = 0;
    overallTxt.alpha = 0;
    overallBg.alpha = 0;
    this.add.tween(highscoreText).to({
      alpha: 1
    }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.add.tween(highscoreTxt).to({
      alpha: 1
    }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.add.tween(highscoreBg).to({
      alpha: 1
    }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.add.tween(totalscoreText).to({
      alpha: 1
    }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.add.tween(overallTxt).to({
      alpha: 1
    }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    this.add.tween(overallBg).to({
      alpha: 1
    }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)
  },
  initAudio: function() {
    storageAPI.initUnset('audio', false);
    this.audioStatus = storageAPI.get('audio');
    this.soundClick = this.add.audio('audio-click');
    this.soundMusic = this.add.audio('audio-music', 1, true);
    this.soundMusic.volume = 0.5;
    if (this.audioStatus) {
      this.audioOffset = 0;
      this.soundMusic.play('', 0, 1, true)
    } else {
      this.audioOffset = 3
    }
    this.buttonAudio.setFrames(this.audioOffset + 1, this.audioOffset + 0, this.audioOffset + 2)
  },
  manageAudio: function() {
    this.audioStatus = !this.audioStatus;
    storageAPI.set('audio', this.audioStatus);
    if (this.audioStatus) {
      this.audioOffset = 0;
      this.soundMusic.play('', 0, 1, true);
      this.soundClick.play()
    } else {
      this.audioOffset = 3;
      this.soundMusic.stop()
    }
    this.buttonAudio.setFrames(this.audioOffset + 1, this.audioOffset + 0, this.audioOffset + 2)
  },
  clickStart: function() {
    if (this.audioStatus) {
      this.soundClick.play()
    }
    this.state.start('Game')
  },
  clickAchievements: function() {
    if (this.audioStatus) {
      this.soundClick.play();
      this.soundMusic.stop()
    }
    this.state.start('Achievements')
  },
  clickAlansWebsite: function() {
    if (this.audioStatus) {
      this.soundClick.play()
    }
    window.top.open('http://homemadeicing.github.io')
  }
};