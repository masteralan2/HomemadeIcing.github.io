Candy.Game = function(game){
	player = null;
  playerStatus = null;
  playerStatusTable = null;
  candy = null;
  scoreText = null;
  explosion = null;
  newCandyMessage = null;
  gamePaused = false;
  gameNewCandy = false;
  gameOver = false;
  runOnce = false;
  runOnce2 = false;
  runOnce3 = false;
  pauseButtonDisabled = false;
  audioStatus = false;
  audioOffset = 0;
  soundClick = null;
  soundMusic = null;
  candyUnlockLevels = [];
  candyActualLevel = 0;
  score = 0;
  scoreGameCompleted = 0;
  globalTimer = 0;
  spawnCandyTimer = 0;
  totalScore = 0;
  candyEnum = {
    'red': 0,
    'marshmallow': 1,
    'jelly': 2,
    'donut': 3,
    'cupcake': 4,
    'pink': 5,
    'lollipop': 6,
    'icecream': 7,
    'teddy': 8,
    'cake': 9,
    'chocolate': 10,
    'super': 11,
    'bomb': 12
  };
  candyList = ['red', 'marshmallow', 'jelly', 'donut', 'cupcake', 'pink', 'lollipop', 'icecream', 'teddy', 'cake', 'chocolate', 'super', 'bomb'];
  livesCount = 0;
  lives = null
};
Candy.Game.prototype = {
  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    gamePaused = false;
    gameOver = false;
    pauseButtonDisabled = false;
    globalTimer = 0;
    spawnCandyTimer = 0;
    score = 0;
    scoreGameCompleted = 100000;
    livesCount = 3;
    runOnce = false;
    runOnce2 = false;
    runOnce3 = false;
    this.add.sprite(0, 0, 'background');
    this.add.sprite(-460, Candy.GAME_HEIGHT - 160, 'floor');
    this.add.sprite(10, 10, 'score-bg');
    pausedScreen = this.add.sprite(0, 0, 'screen-overlay');
    pausedScreenText = this.add.sprite((Candy.GAME_WIDTH - 430) * 0.5, 210, 'text-paused');
    gameOverText = this.add.sprite((Candy.GAME_WIDTH - 594) * 0.5, 210, 'text-gameover');
    newHighscoreText = this.add.sprite(30, 74, 'text-newbestscore');
    newCandyMessage = this.add.sprite(Candy.GAME_WIDTH * 0.5, 320, 'message-newcandy');
    newCandyMessage.anchor.setTo(0.5, 0.5);
    newCandyMessage.scale = {
      x: 0.01,
      y: 0.01
    };
    newCandyMessage.visible = false;
    pausedScreen.visible = false;
    pausedScreenText.alpha = 0;
    gameOverText.alpha = 0;
    newHighscoreText.visible = false;
    buttonBack = this.add.button(-358, Candy.GAME_HEIGHT - 133 - 110, 'button-back', this.backToMain, this, 1, 0, 2);
    buttonContinue = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 131 - 270, 'button-continue', function() {
      pauseButtonDisabled = false;
      this.managePause()
    }, this, 1, 0, 2);
    buttonRestart = this.add.button(Candy.GAME_WIDTH, Candy.GAME_HEIGHT - 131 - 270, 'button-restart', this.restartGame, this, 1, 0, 2);
    buttonPause = this.add.button(Candy.GAME_WIDTH - 96 - 10, 10, 'button-pause', this.managePause, this, 1, 0, 2);
    buttonBack.input.useHandCursor = true;
    buttonContinue.input.useHandCursor = true;
    buttonRestart.input.useHandCursor = true;
    buttonPause.input.useHandCursor = true;
    this.totalScore = storageAPI.get('totalscore');
    candyUnlockLevels = [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
    candyActualLevel = 0;
    for (var i = 0, len = candyUnlockLevels.length; i < len; i++) {
      if (this.totalScore >= candyUnlockLevels[i]) {
        candyActualLevel = i + 1
      }
    }
    playerBasicIdle = this.add.sprite(55 * 2, 385 * 2, 'monster-basic-idle');
    playerBasicIdle.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    playerBasicIdle.animations.play('anim');
    playerBasicIdle.visible = false;
    playerBasicIdle.anchor.setTo(0.5, 0.5);
    playerBasicIdle.scale = {
      x: 2,
      y: 2
    };
    playerBasicEating = this.add.sprite(65 * 2, 380 * 2, 'monster-basic-eats');
    playerBasicEating.animations.add('anim', [0, 1, 2, 3], 10, true);
    playerBasicEating.animations.play('anim');
    playerBasicEating.visible = false;
    playerBasicEating.anchor.setTo(0.5, 0.5);
    playerBasicEating.scale = {
      x: 2,
      y: 2
    };
    playerCrownIdle = this.add.sprite(55 * 2, 374 * 2, 'monster-crown-idle');
    playerCrownIdle.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    playerCrownIdle.animations.play('anim');
    playerCrownIdle.visible = false;
    playerCrownIdle.anchor.setTo(0.5, 0.5);
    playerCrownIdle.scale = {
      x: 2,
      y: 2
    };
    playerCrownEating = this.add.sprite(57 * 2, 380 * 2, 'monster-crown-eats');
    playerCrownEating.animations.add('anim', [0, 1, 2, 3], 10, true);
    playerCrownEating.animations.play('anim');
    playerCrownEating.visible = false;
    playerCrownEating.anchor.setTo(0.5, 0.5);
    playerCrownEating.scale = {
      x: 2,
      y: 2
    };
    playerKingIdle = this.add.sprite(66 * 2, 375 * 2, 'monster-king-idle');
    playerKingIdle.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 10, true);
    playerKingIdle.animations.play('anim');
    playerKingIdle.visible = false;
    playerKingIdle.anchor.setTo(0.5, 0.5);
    playerKingIdle.scale = {
      x: 2,
      y: 2
    };
    playerKingEating = this.add.sprite(60 * 2, 380 * 2, 'monster-king-eats');
    playerKingEating.animations.add('anim', [0, 1, 2, 3], 10, true);
    playerKingEating.animations.play('anim');
    playerKingEating.visible = false;
    playerKingEating.anchor.setTo(0.5, 0.5);
    playerKingEating.scale = {
      x: 2,
      y: 2
    };
    playerStatusTable = {
      'basic': {
        'idle': playerBasicIdle,
        'eating': playerBasicEating
      },
      'crown': {
        'idle': playerCrownIdle,
        'eating': playerCrownEating
      },
      'king': {
        'idle': playerKingIdle,
        'eating': playerKingEating
      }
    };
    if (this.totalScore >= 50000) {
      playerStatus = 'king'
    } else if (this.totalScore >= 25000) {
      playerStatus = 'crown'
    } else {
      playerStatus = 'basic'
    }
    player = playerStatusTable[playerStatus]['idle'];
    player.visible = true;
    buttonAudio = this.add.button(Candy.GAME_WIDTH - 111 - 10, -96, 'button-audio', this.manageAudio, this);
    buttonAudio.visible = false;
    this.initAudio();
    scoreText = this.add.text(120, 28, "0", {
      font: "40px ComicBook",
      fill: "#FFCC00",
      align: "center"
    });
    scoreText.x = (213 + 75 - scoreText.width) * 0.5;
    for (var e = 0; e < 3; e++) {
      var empty = this.add.sprite(560 - (90 * (e + 1)), 50, 'life-empty');
      empty.anchor.setTo(0.5, 0.5)
    }
    lives = this.add.group();
    for (var i = 0; i < 3; i++) {
      life = lives.create(560 - (90 * (i + 1)), 50, 'life-full', i);
      life.anchor.setTo(0.5, 0.5);
      life.scale = {
        x: 0.01,
        y: 0.01
      };
      this.add.tween(life.scale).to({
        x: 1,
        y: 1
      }, 2500, Phaser.Easing.Elastic.Out, true, 600 - 300 * i)
    }
    candyGroup = this.add.group();
    candyGroup.enableBody = true;
    candyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.spawnCandy();
    this._canvasID = document.getElementsByTagName("canvas")[0];
    this._canvas = this._canvasID.getContext("2d")
  },
  managePause: function() {
    if (this.audioStatus) {
      this.soundClick.play()
    }
    if (!pauseButtonDisabled) {
      gamePaused = !gamePaused;
      if (!gamePaused) {
        runOnce = false;
        runOnce2 = false;
        runOnce3 = false;
        if (newCandyMessage.visible) {
          var newCandyTween = this.add.tween(newCandyMessage.scale);
          newCandyTween.to({
            x: 0.01,
            y: 0.01
          }, 500, Phaser.Easing.Elastic.Out);
          newCandyTween.onComplete.addOnce(function() {
            newCandyMessage.visible = false;
            gameNewCandy = false
          }, this);
          newCandyTween.start()
        }
        this.add.tween(pausedScreenText).to({
          alpha: 0
        }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.add.tween(buttonAudio).to({
          y: -96
        }, 300, Phaser.Easing.Exponential.Out, true, 0, 0, false);
        this.add.tween(buttonBack).to({
          x: -358
        }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
        this.manageAnimations('on');
        var continueTween = this.add.tween(buttonContinue);
        continueTween.to({
          x: Candy.GAME_WIDTH
        }, 300, Phaser.Easing.Exponential.Out);
        continueTween.onComplete.addOnce(function() {
          pausedScreen.visible = false
        }, this);
        continueTween.start()
      }
    }
  },
  playerAnimation: function(animation) {
    player.visible = false;
    player = playerStatusTable[playerStatus][animation];
    player.visible = true
  },
  clickCandy: function(candy) {
    if (this.input.activePointer.isDown) {
      this.playerAnimation('eating');
      if (this.audioStatus) {
        this.soundEating.play()
      }
      candy.inputEnabled = false;
      if (!gamePaused) {
        if (candy.type == candyEnum.bomb) {
          explosion = this.add.sprite(candy.x, candy.y, 'explosion');
          explosion.anchor.setTo(0.5, 0.5);
          explosion.scale = {
            x: 0.01,
            y: 0.01
          };
          candy.kill();
          this.playerAnimation('idle');
          var gameoverTween = this.add.tween(explosion.scale);
          gameoverTween.to({
            x: 1,
            y: 1
          }, 500, Phaser.Easing.Elastic.Out);
          gameoverTween.onComplete.addOnce(function() {
            gameOver = true
          }, this);
          gameoverTween.start()
        } else {
          if (candy.type == candyEnum.super) {
            score += 30
          } else {
            score += (candy.type + 1)
          }
          var destination = candy.y - 100;
          var pointsAdded = this.add.text(candy.x, candy.y, '+' + (candy.type + 1), {
            font: "48px ComicBook",
            fill: "#FFCC00",
            stroke: "#663399",
            strokeThickness: 10
          });
          pointsAdded.anchor.setTo(0.5, 0.5);
          this.add.tween(pointsAdded).to({
            alpha: 0,
            y: destination
          }, 1000, Phaser.Easing.Linear.None).start();
          scoreText.setText(score);
          scoreText.x = (213 + 75 - scoreText.width) * 0.5;
          candy.body = null;
          var eatTween = this.add.tween(candy);
          eatTween.to({
            x: 140,
            y: 800
          }, 250, Phaser.Easing.Linear.None);
          eatTween.onComplete.addOnce(function() {
            candy.kill();
            this.playerAnimation('idle')
          }, this);
          eatTween.start();
          if (score + this.totalScore >= candyUnlockLevels[candyActualLevel]) {
            candyActualLevel += 1;
            gameNewCandy = true;
            gamePaused = true;
            if (this.audioStatus) {
              this.soundNewlevel.play()
            }
          }
          if (score >= scoreGameCompleted) {
            this.add.sprite(0, 0, 'screen-completed')
          }
        }
      }
    }
  },
  spawnCandy: function() {
    var candyType = null;
    candyType = Math.floor(Math.random() * candyActualLevel);
    var randomizeCandyType = Math.floor(Math.random() * 100);
    if (randomizeCandyType == 13) {
      candyType = candyEnum.super
    } else if (randomizeCandyType > 90) {
      candyType = candyEnum.bomb
    }
    var launchPosition = Math.floor(Math.random() * 2) * (Candy.GAME_WIDTH);
    candy = candyGroup.create(launchPosition, Candy.GAME_HEIGHT, 'candy-' + candyList[candyType]);
    candy.type = candyType;
    candy.inputEnabled = true;
    candy.events.onInputDown.add(this.clickCandy, this);
    candy.events.onInputOver.add(this.clickCandy, this);
    var horizontalDirection = (launchPosition) ? -1 : 1;
    var horizontalMovement = horizontalDirection * (Math.floor(Math.random() * 200));
    candy.body.velocity.x = horizontalMovement * 2;
    candy.body.velocity.y = -(Math.floor(Math.random() * 150) + 400) * 2;
    candy.body.gravity.y = 300 * 2;
    candy.anchor.setTo(0.5, 0.5);
    candy.scale = {
      x: 2,
      y: 2
    };
    candy.rotateMe = (Math.random() * 8) - 4;
    candy.cachedVelocity = {};
    candy.active = true;
    candy.checkWorldBounds = true;
    candy.events.onOutOfBounds.add(this.resetCandy, this)
  },
  update: function() {
    if (window.navigator && window.navigator.userAgent.indexOf('534.30') > 0) {
      if (this._canvas.style.opacity !== undefined) {
        this._canvas.style.opacity = 0.99;
        setTimeout(function() {
          this._canvas.style.opacity = 1
        }, 0)
      }
    }
    if (gameOver) {
      if (!runOnce) {
        var oldScore = storageAPI.get('highscore');
        var newTotalscore = this.totalScore + score;
        storageAPI.setHighscore('highscore', score);
        storageAPI.set('totalscore', newTotalscore);
        runOnce = true;
        this.manageAnimations('off');
        pausedScreen.visible = true;
        pausedScreen.bringToTop();
        if (score > oldScore) {
          newHighscoreText.visible = true;
          newHighscoreText.bringToTop()
        }
        buttonAudio.visible = true;
        buttonAudio.bringToTop();
        gameOverText.bringToTop();
        this.add.tween(gameOverText).to({
          alpha: 1
        }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
        buttonBack.bringToTop();
        buttonRestart.visible = true;
        buttonRestart.bringToTop();
        this.add.tween(buttonBack).to({
          x: (Candy.GAME_WIDTH - 358) * 0.5
        }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
        this.add.tween(buttonRestart).to({
          x: (Candy.GAME_WIDTH - 363) * 0.5
        }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
        pauseButtonDisabled = true;
        this.add.sprite(10, 10, 'score-bg');
        scoreText = this.add.text(120, 28, score, {
          font: "40px ComicBook",
          fill: "#FFCC00",
          align: "center"
        });
        scoreText.x = (213 + 75 - scoreText.width) * 0.5
      }
    } else if (!gamePaused) {
      spawnCandyTimer += this.time.elapsed;
      globalTimer += this.time.elapsed;
      var numberOfCandy = Math.ceil(globalTimer / 20000);
      var numberOfSeconds = (2000 - score) / Math.ceil(globalTimer / 60000);
      if (spawnCandyTimer > numberOfSeconds) {
        spawnCandyTimer = 0;
        for (var i = 0; i < numberOfCandy; i++) {
          this.spawnCandy()
        }
      }
      var that = this;
      candyGroup.forEach(function(candy) {
        candy.angle += candy.rotateMe
      })
    } else {
      if (gameNewCandy) {
        if (!runOnce2) {
          runOnce2 = true;
          pausedScreen.visible = true;
          pausedScreen.bringToTop();
          newCandyMessage.visible = true;
          newCandyMessage.bringToTop();
          this.add.tween(newCandyMessage.scale).to({
            x: 1,
            y: 1
          }, 1500, Phaser.Easing.Elastic.Out).start();
          buttonContinue.visible = true;
          buttonContinue.bringToTop();
          this.add.tween(buttonContinue).to({
            x: (Candy.GAME_WIDTH - 358) * 0.5
          }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
          this.manageAnimations('off')
        }
      } else {
        if (!runOnce3) {
          runOnce3 = true;
          pausedScreen.visible = true;
          pausedScreen.bringToTop();
          buttonAudio.visible = true;
          buttonAudio.bringToTop();
          pausedScreenText.bringToTop();
          buttonBack.bringToTop();
          buttonContinue.visible = true;
          buttonContinue.bringToTop();
          this.add.tween(pausedScreenText).to({
            alpha: 1
          }, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
          this.add.tween(buttonAudio).to({
            y: 10
          }, 300, Phaser.Easing.Exponential.Out, true, 0, 0, false);
          this.add.tween(buttonBack).to({
            x: (Candy.GAME_WIDTH - 358) * 0.5
          }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
          this.add.tween(buttonContinue).to({
            x: (Candy.GAME_WIDTH - 358) * 0.5
          }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
          this.manageAnimations('off');
          pauseButtonDisabled = true
        }
      }
    }
  },
  resetCandy: function(candy) {
    candy.active = false;
    var killmarker = this.add.sprite(-83, -83, 'killmarker');
    var half = 42,
      full = 83;
    killmarker.anchor.setTo(0.5, 0.5);
    killmarker.alpha = 0;
    if (candy.type != candyEnum.super && candy.type != candyEnum.bomb) {
      if (candy.y < 0) {
        killmarker.animations.add('kill', [0], 10, true);
        killmarker.x = Math.floor(candy.x);
        killmarker.y = half;
        if (candy.x < half) {
          killmarker.x = half
        } else if (candy.x > Candy.GAME_WIDTH - half) {
          killmarker.x = Candy.GAME_WIDTH - half
        }
      } else if (candy.y > Candy.GAME_HEIGHT) {
        killmarker.animations.add('kill', [3], 10, true);
        killmarker.x = Math.floor(candy.x);
        killmarker.y = Candy.GAME_HEIGHT - half;
        if (candy.x < half) {
          killmarker.x = half
        } else if (candy.x > Candy.GAME_WIDTH - half) {
          killmarker.x = Candy.GAME_WIDTH - half
        }
      } else if (candy.x < 0) {
        killmarker.animations.add('kill', [2], 10, true);
        killmarker.x = half;
        killmarker.y = Math.floor(candy.y);
        if (candy.y < full) {
          killmarker.y = full
        } else if (candy.y > Candy.GAME_HEIGHT - full) {
          killmarker.y = Candy.GAME_HEIGHT - full
        }
      } else if (candy.x > Candy.GAME_WIDTH) {
        killmarker.animations.add('kill', [1], 10, true);
        killmarker.x = Candy.GAME_WIDTH - half;
        killmarker.y = Math.floor(candy.y);
        if (candy.y < full) {
          killmarker.y = full
        }
        if (candy.y > Candy.GAME_HEIGHT - full) {
          killmarker.y = Candy.GAME_HEIGHT - full
        }
      }
      killmarker.animations.play('kill');
      var showTween = this.add.tween(killmarker);
      showTween.to({
        alpha: 1
      }, 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
      showTween.onComplete.addOnce(function() {
        killmarker.alpha = 0
      }, this);
      showTween.start();
      var life = lives.getFirstAlive();
      if (life) {
        this.add.tween(life.scale).to({
          x: 0.01,
          y: 0.01
        }, 500, Phaser.Easing.Back.Out, true, 0).onComplete.addOnce(function() {
          life.kill()
        }, this);
        livesCount -= 1
      }
      if (!livesCount) {
        gameOver = true
      }
    }
    candy.kill()
  },
  initAudio: function() {
    storageAPI.initUnset('audio', false);
    this.audioStatus = storageAPI.get('audio');
    this.soundClick = this.add.audio('audio-click');
    this.soundEating = this.add.audio('audio-eating');
    this.soundNewlevel = this.add.audio('audio-newlevel');
    this.soundMusic = this.add.audio('audio-music', 1, true);
    this.soundMusic.volume = 0.5;
    if (this.audioStatus) {
      this.audioOffset = 0;
      this.soundMusic.play('', 0, 1, true)
    } else {
      this.audioOffset = 3
    }
    buttonAudio.setFrames(this.audioOffset + 1, this.audioOffset + 0, this.audioOffset + 2)
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
    buttonAudio.setFrames(this.audioOffset + 1, this.audioOffset + 0, this.audioOffset + 2)
  },
  manageAnimations: function(status) {
    if (status == 'on') {
      candyGroup.forEach(function(candy) {
        if (candy.body) {
          candy.body.velocity.x = candy.cachedVelocity.x;
          candy.body.velocity.y = candy.cachedVelocity.y;
          candy.body.gravity.y = 300
        }
      });
      player.animations.play('anim')
    } else if (status == 'off') {
      candyGroup.forEach(function(candy) {
        if (candy.body) {
          candy.cachedVelocity.x = candy.body.velocity.x;
          candy.cachedVelocity.y = candy.body.velocity.y;
          candy.body.velocity.x = 0;
          candy.body.velocity.y = 0;
          candy.body.gravity.y = 0
        }
      });
      player.animations.stop('anim')
    }
  },
  restartGame: function() {
    if (this.audioStatus) {
      this.soundClick.play()
    }
    this.add.tween(gameOverText).to({
      alpha: 0
    }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
    this.add.tween(buttonBack).to({
      x: -358
    }, 300, Phaser.Easing.Exponential.Out, true, 0, false);
    var restartTween = this.add.tween(buttonRestart);
    restartTween.to({
      x: Candy.GAME_WIDTH
    }, 300, Phaser.Easing.Exponential.Out);
    restartTween.onComplete.addOnce(function() {
      this.soundMusic.stop();
      this.state.start('Game')
    }, this);
    restartTween.start()
  },
  backToMain: function() {
    if (this.audioStatus) {
      this.soundClick.play()
    }
    this.soundMusic.stop();
    this.state.start('MainMenu')
  },
  render: function() {}
};