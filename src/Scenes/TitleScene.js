import Phaser from 'phaser';
import config from '../Options/config';
import Button from '../Elements/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.model = this.sys.game.globals.model;
    if (!(this.model.musicOn !== true || this.model.bgMusicPlaying !== false)) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.4, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    // Help
    this.helpButton = new Button(this, config.width / 2, config.height / 2 + 100, 'greyButton1', 'greyButton2', 'Help', 'Help');
    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2, 'greyButton1', 'greyButton2', 'Credits', 'Credits');
    // Game
    this.playButton = new Button(this, config.width / 2, config.height / 2 - 100, 'greyButton1', 'greyButton2', 'Play', 'Instructions');
  }
}