import Phaser from 'phaser';
import webapi from '../Services/webapi';
import gameSetup from '../Services/gamesetup';
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
    this.firstCactus = true;
  }

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

    if (this.firstCactus) {
      this.firstCactus = false;
    } else if (Phaser.Math.Between(1, 100) <= gameOptions.cactusPercent) {
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

  jump() {
    if ((!this.dying)
            && (
              this.player.body.touching.down
                || (this.playerJumps > 0
                    && this.playerJumps < gameOptions.jumps))) {
      if (this.player.body.touching.down) {
        if (gameSetup.currentLives() !== 0) {
          this.jumpSound = this.sound.add('jumpSound', { volume: 0.1, loop: false });
          this.jumpSound.play();
        }
        this.playerJumps = 0;
        this.scoreUp();
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      this.player.anims.stop();
    }
  }

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

  getRightmostcloud() {
    let rightmostcloud = -200;
    this.cloudGroup.getChildren().forEach((cloud) => {
      rightmostcloud = Math.max(rightmostcloud, cloud.x);
    });
    return rightmostcloud;
  }

  addScoreDisplay() {
    switch (gameSetup.currentLives()) {
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
    this.scoreText = this.add.text(40, 40, `Score: ${gameSetup.currentScore()}`, {
      fontSize: 20,
      fill: '#000',
    });
  }

  scoreUp(points) {
    gameSetup.scoreUp(points);
    this.updateScore();
  }

  updateScore() {
    this.scoreText.setText(`Score: ${gameSetup.currentScore()}`);
  }

  lifeOver() {
    gameSetup.liveDown();
    this.fallSound = this.sound.add('fallSound', { volume: 0.9, loop: false });
    this.fallSound.play();
    switch (gameSetup.currentLives()) {
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
    webapi.saveScore(this.model.playerName === '' ? 'Anon' : this.model.playerName, gameSetup.currentScore()).then(() => {
      callback();
    });
  }

  preload() {
    this.addScoreDisplay();
    this.keys.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.model = this.sys.game.globals.model;
  }

  create() {
    this.cloudGroup = this.add.group();

    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.meatGroup = this.add.group({
      removeCallback(meat) {
        meat.scene.meatPool.add(meat);
      }
    });

    this.meatPool = this.add.group({
      removeCallback(meat) {
        meat.scene.meatGroup.add(meat);
      },
    });

    this.cactusGroup = this.add.group({

      removeCallback(cactus) {
        cactus.scene.cactusPool.add(cactus);
      },
    });

    this.cactusPool = this.add.group({

      removeCallback(cactus) {
        cactus.scene.cactusGroup.add(cactus);
      },
    });

    this.addclouds();

    this.addedPlatforms = 0;

    this.playerJumps = 0;

    this.newPlatform(
      config.width, config.width / 1.5,
      config.height * gameOptions.platformVerticalLimit[1],
    );

    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, config.height * 0.7, 'player');
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);

    this.dying = false;

    const runAnimation = (player) => {
      if (!player.anims.isPlaying) {
        player.anims.play('run');
      }
    };

    this.physics.add.collider(this.player,
      this.platformGroup,
      runAnimation(this.player), null, this);

    this.physics.add.overlap(this.player,
      this.meatGroup,
      (player, meat) => {
        this.riserSound = this.sound.add('riserSound', { volume: 0.2, loop: false });
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

    this.physics.add.overlap(this.player, this.cactusGroup, () => {
      this.player.y = 10000;
      this.dying = true;
      this.player.anims.stop();
      this.player.setFrame(2);
      this.player.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }, null, this);

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusic === true) {
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusic = false;
      this.bgMusicGame = this.sound.add('bgMusicGame', { volume: 0.5, loop: true });
      this.bgMusicGame.play();
      this.sys.game.globals.bgMusicGame = this.bgMusicGame;
    }

    this.input.on('pointerdown', this.jump, this);
  }

  gameOver() {
    this.lifeOver();
    if (gameSetup.currentLives() === 0) {
      this.scene.pause();
      const game = this;
      game.sys.game.globals.bgMusicGame.stop();
      this.bgGameOverMusic = this.sound.add('bgGameOverMusic', { volume: 0.5, loop: false });
      this.bgGameOverMusic.play();
      this.timedEvent = this.time.delayedCall(2000, this.saveScore(() => {
        game.model.score = gameSetup.currentScore();
        game.scene.start('GameOver');
        game.sys.game.globals.bgMusic.play();
        game.model.bgMusic = true;
        gameSetup.newGame();
      }), [], this);
    } else {
      this.scene.start('Game');
    }
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keys.keyEnter)) {
      this.jump();
    }

    if (this.player.y > config.height) {
      this.firstCactus = true;
      this.lifeOver();
      if (gameSetup.currentLives() === 0) {
        this.scene.pause();
        const game = this;
        game.sys.game.globals.bgMusicGame.stop();
        this.bgGameOverMusic = this.sound.add('bgGameOverMusic', { volume: 0.5, loop: false });
        this.bgGameOverMusic.play();
        this.timedEvent = this.time.delayedCall(2000, this.saveScore(() => {
          game.model.score = gameSetup.currentScore();
          game.scene.start('GameOver');
          game.sys.game.globals.bgMusic.play();
          game.model.bgMusic = true;
          gameSetup.newGame();
        }), [], this);
      } else {
        this.scene.start('Game');
      }
    }
    this.player.x = gameOptions.playerStartPosition;

    let minDistance = config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
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

    this.meatGroup.getChildren().forEach((meat) => {
      if (meat.x < -meat.displayWidth / 2) {
        this.meatGroup.killAndHide(meat);
        this.meatGroup.remove(meat);
      }
    }, this);

    this.cactusGroup.getChildren().forEach((cactus) => {
      if (cactus.x < -cactus.displayWidth / 2) {
        this.cactusGroup.killAndHide(cactus);
        this.cactusGroup.remove(cactus);
      }
    }, this);

    this.cloudGroup.getChildren().forEach((cloud) => {
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

const resize = () => {
  const canvas = document.querySelector('canvas');
  canvas.style.border = '5px solid grey';
  const windowWidth = window.innerWidth*0.9;
  const windowHeight = window.innerHeight*0.9;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = config.width / config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowWidth / gameRatio}px`;
  } else {
    canvas.style.width = `${windowHeight * gameRatio}px`;
    canvas.style.height = `${windowHeight}px`;
  }
};

window.onload = () => {
  window.focus();
  resize();
  window.addEventListener('resize', resize, false);
};