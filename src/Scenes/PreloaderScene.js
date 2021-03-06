import Phaser from 'phaser';
import fallSound from '../assets/fall-down.mp3';
import riserSound from '../assets/raiser.wav';
import platform from '../assets/ui/square.jpg';
import player from '../assets/ui/google_dino.png';
import meat from '../assets/ui/meat.png';
import cloud from '../assets/ui/cloud.png';
import bgMusic from '../assets/Loyalty_Freak_Music.mp3';
import bgGameOverMusic from '../assets/shindeiru.ogg';
import jumpSound from '../assets/jumping.mp3';
import cactus from '../assets/ui/cactus.png';
import heart from '../assets/ui/grey_heart.png';
import greyButton1 from '../assets/ui/grey_button1.jpg';
import greyButton2 from '../assets/ui/grey_button2.png';
import bgMusicGame from '../assets/Steve_Combs.mp3';
import radioButtonBlank from '../assets/ui/radioButton_blank.png';
import radioButtonCheck from '../assets/ui/radioButton_check.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.add.image(400, 200, 'logo');

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

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.audio('jumpSound', [jumpSound]);
    this.load.audio('fallSound', [fallSound]);
    this.load.audio('riserSound', [riserSound]);
    this.load.image('heart1', heart);
    this.load.image('heart2', heart);
    this.load.image('heart3', heart);

    this.load.image('greyButton1', greyButton1);
    this.load.image('greyButton2', greyButton2);
    this.load.audio('bgMusic', [bgMusic]);
    this.load.audio('bgMusicGame', [bgMusicGame]);
    this.load.audio('bgGameOverMusic', [bgGameOverMusic]);
    this.load.image('radioButtonBlank', radioButtonBlank);
    this.load.image('radioButtonCheck', radioButtonCheck);

    this.load.image('platform', platform);
    this.load.spritesheet('player', player, {
      frameWidth: 24,
      frameHeight: 48,
    });
    this.load.spritesheet('meat', meat, {
      frameWidth: 40,
      frameHeight: 40,
    });
    this.load.spritesheet('cloud', cloud, {
      frameWidth: 1024,
      frameHeight: 1024,
    });
    this.load.spritesheet('cactus', cactus, {
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