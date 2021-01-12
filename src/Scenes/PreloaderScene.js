import Phaser from 'phaser';
import blueButton1 from '../assets/ui/grey_button1.png';
import blueButton2 from '../assets/ui/grey_button2.jpg';
import box from '../assets/ui/grey_box.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import bgMusicGame from '../assets/Steve_Combs.mp3';
import bgMusic from '../assets/Loyalty_Freak_Music.mp3';
import bgGameOverMusic from '../assets/shindeiru.ogg';
import jumpSound from '../assets/jumping.mp3';
import downerSound from '../assets/fall-down.mp3';
import riserSound from '../assets/raiser.wav';
import platform from '../assets/ui/square.jpg';
import player from '../assets/ui/google_dino.png';
import bubble from '../assets/ui/meat.png';
import cloud from '../assets/ui/cloud2.png';
import virus from '../assets/ui/tree.png';
import heart from '../assets/ui/grey_heart.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#000000',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#000000',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#000000',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    this.load.audio('bgMusic', [bgMusic]);
    this.load.audio('bgMusicGame', [bgMusicGame]);
    this.load.audio('bgGameOverMusic', [bgGameOverMusic]);
    this.load.audio('jumpSound', [jumpSound]);
    this.load.audio('downerSound', [downerSound]);
    this.load.audio('riserSound', [riserSound]);
    this.load.image('heart1', heart);
    this.load.image('heart2', heart);
    this.load.image('heart3', heart);


    // preloading game assets
    this.load.image('platform', platform);
    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet('player', player, {
      frameWidth: 24,
      frameHeight: 48,
    });
    // the bubble is a sprite sheet made by 20x20 pixels
    this.load.spritesheet('bubble', bubble, {
      frameWidth: 40,
      frameHeight: 40,
    });
    // building are a sprite sheet made by 512x512 pixels
    this.load.spritesheet('building', cloud, {
      frameWidth: 1024,
      frameHeight: 1024,
    });
    // the viruscamp is a sprite sheet made by 32x58 pixels
    this.load.spritesheet('virus', virus, {
      frameWidth: 55,
      frameHeight: 55,
    });
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}