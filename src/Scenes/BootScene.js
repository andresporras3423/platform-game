import Phaser from 'phaser';
import phaserLogo from '../assets/logo.png';
import secondScreen from '../assets/second-screen.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
    this.image = {};
  }

  preload() {
    this.load.image('logo', secondScreen);
    this.load.image('phaserLogo', phaserLogo);
  }

  create() {
    this.add.image(400, 300, 'phaserLogo');
    this.timedEvent = this.time.delayedCall(1800, this.ready, [], this);
  }

  ready() {
    this.scene.start('Preloader');
  }

  fadeImage() {
    this.add.tween(this.image).to({ alpha: 0 }, 1800, Phaser.Easing.Linear.None, true);
  }
}