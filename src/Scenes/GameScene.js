/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */
import Phaser from 'phaser';
import webapi from '../Services/webapi';
import GameLogic from '../Services/gamelogic';
import gameOptions from '../Options/gameOptions';
import config from '../Options/config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.model = {};
    this.keys = {};
    this.heart1 = {};
    this.heart2 = {};
    this.heart3 = {};
    this.firstCactus=true;
  }

  // the core of the script: platform are added from the pool or created on the fly
  newPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.active = true;
      platform.visible = true;
      platform.x = posX;
      platform.y = posY;
      this.platformPool.remove(platform);
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(
        Phaser.Math.Between(
          gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1],
        ) * -1,
      );
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1],
    );

    // is there a meat over the platform?
    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.meatPercent) {
        if (this.meatPool.getLength()) {
          const meat = this.meatPool.getFirst();
          meat.x = posX;
          meat.y = posY - 96;
          meat.alpha = 1;
          meat.active = true;
          meat.visible = true;
          this.meatPool.remove(meat);
        } else {
          const meat = this.physics.add.sprite(posX, posY - 96, 'meat');
          meat.setImmovable(true);
          meat.setVelocityX(platform.body.velocity.x);
          meat.anims.play('rotate');
          meat.setDepth(2);
          this.meatGroup.add(meat);
        }
      }
    }
    // is there a cactus over the platform?
    if(this.firstCactus){
      this.firstCactus=false;
    }
    else{
    if (Phaser.Math.Between(1, 100) <= gameOptions.cactusPercent) {
      if (this.cactusPool.getLength()) {
          const cactus = this.cactusPool.getFirst();
        cactus.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
        cactus.y = posY - 46;
        cactus.alpha = 1;
        cactus.active = true;
        cactus.visible = true;
        this.cactusPool.remove(cactus);
      } else {
        const cactus = this.physics.add.sprite(
          posX - platformWidth / 2
                    + Phaser.Math.Between(1, platformWidth), posY - 46, 'cactus',
        );
        
          cactus.setImmovable(true);
        cactus.setVelocityX(platform.body.velocity.x);
        cactus.setSize(8, 2, true);
        cactus.anims.play('burn');
        cactus.setDepth(2);
        this.cactusGroup.add(cactus);
      }
    }
  }
  }
  // the player jumps when on the ground, or once in the air as long as there are
  // jumps left and the first jump was on the ground
  // and obviously if the player is not dying
  jump() {
    if ((!this.dying)
            && (
              this.player.body.touching.down
                || (this.playerJumps > 0
                    && this.playerJumps < gameOptions.jumps))) {
      if (this.player.body.touching.down) {
        if (GameLogic.currentLives() !== 0) {
          this.jumpSound = this.sound.add('jumpSound', { volume: 0.4, loop: false });
          this.jumpSound.play();
        }
        this.playerJumps = 0;
        this.scoreUp();
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      // stops animation
      this.player.anims.stop();
    }
  }

  // adding clouds
  addclouds() {
    const rightmostcloud = this.getRightmostcloud();
    if (rightmostcloud < config.width * 2) {
      const cloud = this.physics.add.sprite(rightmostcloud + Phaser.Math.Between(100, 350), config.height + Phaser.Math.Between(0, 100), 'cloud');
      cloud.setOrigin(0.5, 1);
      cloud.body.setVelocityX(gameOptions.cloudSpeed * -1);
      this.cloudGroup.add(cloud);
      if (Phaser.Math.Between(0, 1)) {
        cloud.setDepth(1);
      }
      cloud.setFrame(Phaser.Math.Between(0, 3));
      this.addclouds();
    }
  }

  // getting rightmost cloud x position
  getRightmostcloud() {
    let rightmostcloud = -200;
    this.cloudGroup.getChildren().forEach((cloud) => {
      rightmostcloud = Math.max(rightmostcloud, cloud.x);
    });
    return rightmostcloud;
  }

  addScoreDisplay() {
    switch (GameLogic.currentLives()) {
      case (1):
        this.heart1 = this.add.image(config.width - 80, 40, 'heart1');
        break;
      case 2:
        this.heart1 = this.add.image(config.width - 80, 40, 'heart1');
        this.heart2 = this.add.image(config.width - 120, 40, 'heart2');
        break;
      case 3:
        this.heart1 = this.add.image(config.width - 80, 40, 'heart1');
        this.heart2 = this.add.image(config.width - 120, 40, 'heart2');
        this.heart3 = this.add.image(config.width - 160, 40, 'heart3');
        break;
      default:
        break;
    }
    this.scoreText = this.add.text(40, 40, `Score: ${GameLogic.currentScore()}`, {
      fontSize: 20,
      fill: '#000',
    });
  }

  scoreUp(points) {
    GameLogic.scoreUp(points);
    this.updateScore();
  }

  updateScore() {
    this.scoreText.setText(`Score: ${GameLogic.currentScore()}`);
  }

  lifeOver() {
    GameLogic.liveDown();
    this.fallSound = this.sound.add('fallSound', { volume: 0.9, loop: false });
    this.fallSound.play();
    switch (GameLogic.currentLives()) {
      case (2):
        this.heart3.visible = false;
        break;
      case (1):
        this.heart2.visible = false;
        break;
      default:
        this.heart1.visible = false;
        break;
    }
  }

  saveScore(callback) {
    webapi.saveScore(this.model.playerName === '' ? 'Anon' : this.model.playerName, GameLogic.currentScore()).then(() => {
      callback();
    });
  }

  preload() {
    this.addScoreDisplay();
    this.keys.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.model = this.sys.game.globals.model;
  }

  create() {
    // group with all active clouds.
    this.cloudGroup = this.add.group();

    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // group with all active meats.
    this.meatGroup = this.add.group({
      // once a meat is removed, it's added to the pool
      removeCallback(meat) {
        meat.scene.meatPool.add(meat);
      },
    });

    // meat pool
    this.meatPool = this.add.group({
      // once a meat is removed from the pool, it's added to the active meats group
      removeCallback(meat) {
        meat.scene.meatGroup.add(meat);
      },
    });

    // group with all active cactuscamps.
    this.cactusGroup = this.add.group({

      // once a cactuscamp is removed, it's added to the pool
      removeCallback(cactus) {
        cactus.scene.cactusPool.add(cactus);
      },
    });

    // cactus pool
    this.cactusPool = this.add.group({

      // once a cactus is removed from the pool, it's added to the active cactus group
      removeCallback(cactus) {
        cactus.scene.cactusGroup.add(cactus);
      },
    });

    // adding a cloud
    this.addclouds();

    // keeping track of added platforms
    this.addedPlatforms = 0;

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width, x position and y position
    this.newPlatform(
      config.width, config.width / 1.5,
      config.height * gameOptions.platformVerticalLimit[1],
    );

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, config.height * 0.7, 'player');
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);

    // the player is not dying
    this.dying = false;

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup, function () {
      // play "run" animation if the player is on a platform
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    // setting collisions between the player and the meat group
    this.physics.add.overlap(this.player, this.meatGroup, function (player, meat) {
      this.riserSound = this.sound.add('riserSound', { volume: 0.5, loop: false });
      this.riserSound.play();
      this.scoreUp(50);
      this.tweens.add({
        targets: meat,
        y: meat.y - 100,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        callbackScope: this,
        onComplete() {
          this.meatGroup.killAndHide(meat);
          this.meatGroup.remove(meat);
        },
      });
    }, null, this);

    // setting collisions between the player and the cactus group
    this.physics.add.overlap(this.player, this.cactusGroup, function () {
      this.player.y = 10000;
      this.dying = true;
      this.player.anims.stop();
      this.player.setFrame(2);
      this.player.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }, null, this);

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === true) {
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
      this.bgMusicGame = this.sound.add('bgMusicGame', { volume: 0.5, loop: true });
      this.bgMusicGame.play();
      this.sys.game.globals.bgMusicGame = this.bgMusicGame;
    }

    // allow click for mobile users
    this.input.on('pointerdown', this.jump, this);
  }

  gameOver(){
    this.lifeOver();
      if (GameLogic.currentLives() === 0) {
        this.scene.pause();
        game = this;
        game.sys.game.globals.bgMusicGame.stop();
        this.bgGameOverMusic = this.sound.add('bgGameOverMusic', { volume: 0.5, loop: false });
        this.bgGameOverMusic.play();
        this.timedEvent = this.time.delayedCall(2000, this.saveScore(() => {
          game.model.score = GameLogic.currentScore();
          game.scene.start('GameOver');
          game.sys.game.globals.bgMusic.play();
          game.model.bgMusicPlaying = true;
          GameLogic.newGame();
        }), [], this);
      } else {
        this.scene.start('Game');
      }
  }

  update() {
    // jumping listener
    if (Phaser.Input.Keyboard.JustDown(this.keys.keyEnter)) {
      this.jump();
    }

    // game over
    if (this.player.y > config.height) {
      this.firstCactus=true;
      this.lifeOver();
      if (GameLogic.currentLives() === 0) {
        this.scene.pause();
        game = this;
        game.sys.game.globals.bgMusicGame.stop();
        this.bgGameOverMusic = this.sound.add('bgGameOverMusic', { volume: 0.5, loop: false });
        this.bgGameOverMusic.play();
        this.timedEvent = this.time.delayedCall(2000, this.saveScore(() => {
          game.model.score = GameLogic.currentScore();
          game.scene.start('GameOver');
          game.sys.game.globals.bgMusic.play();
          game.model.bgMusicPlaying = true;
          GameLogic.newGame();
        }), [], this);
      } else {
        this.scene.start('Game');
      }
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function (platform) {
      const platformDistance = config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // recycling meats
    this.meatGroup.getChildren().forEach(function (meat) {
      if (meat.x < - meat.displayWidth / 2) {
        this.meatGroup.killAndHide(meat);
        this.meatGroup.remove(meat);
      }
    }, this);

    // recycling cactus
    this.cactusGroup.getChildren().forEach(function (cactus) {
      if (cactus.x < -cactus.displayWidth / 2) {
        this.cactusGroup.killAndHide(cactus);
        this.cactusGroup.remove(cactus);
      }
    }, this);

    // recycling clouds
    this.cloudGroup.getChildren().forEach(function (cloud) {
      if (cloud.x < -cloud.displayWidth) {
        const rightmostcloud = this.getRightmostcloud();
        cloud.x = rightmostcloud + Phaser.Math.Between(100, 350);
        cloud.y = config.height + Phaser.Math.Between(0, 100);
        cloud.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          cloud.setDepth(1);
        }
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(
        gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1],
      );
      const platformRandomHeight = gameOptions.platformHeighScale
                * Phaser.Math.Between(
                  gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1],
                );
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = config.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = config.height * gameOptions.platformVerticalLimit[1] - 0.1;
      const nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap, minPlatformHeight, maxPlatformHeight,
      );
      this.newPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
}

function resize() {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = config.width / config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowWidth / gameRatio}px`;
  } else {
    canvas.style.width = `${windowHeight * gameRatio}px`;
    canvas.style.height = `${windowHeight}px`;
  }
}

window.onload = () => {
  window.focus();
  resize();
  window.addEventListener('resize', resize, false);
};