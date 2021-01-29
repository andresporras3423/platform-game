import Phaser from 'phaser';
import phaserLogo from '../assets/logo.png';
import splashScreen from '../assets/kitkit-logo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
    this.picture = {};
  }

  preload() {
    this.load.image('phaserLogo', phaserLogo);
    this.load.image('logo', splashScreen);
  }

  create() {
    this.add.image(400, 300, 'phaserLogo');
    this.timedEvent = this.time.delayedCall(1800, this.ready, [], this);
  }

  ready() {
    this.scene.start('Preloader');
  }

  fadePicture() {
    this.add.tween(this.picture).to({ alpha: 0 }, 1800, Phaser.Easing.Linear.None, true);
  }
}