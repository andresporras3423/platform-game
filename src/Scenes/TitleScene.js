import Phaser from 'phaser';
import config from '../Options/config';
import Button from '../Elements/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'greyButton1', 'greyButton2', 'Play', 'Instructions');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2, 'greyButton1', 'greyButton2', 'Credits', 'Credits');

    // Help
    this.helpButton = new Button(this, config.width / 2, config.height / 2 + 100, 'greyButton1', 'greyButton2', 'Help', 'Help');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}