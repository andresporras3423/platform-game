import Phaser from 'phaser';
import Button from '../Elements/Button';
import config from '../Options/config';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.playButton = new Button(this, config.width / 2, config.height / 2 - 100, 'greyButton1', 'greyButton2', 'Play Again', 'Game');

    this.scoresButton = new Button(this, config.width / 2, config.height / 2, 'greyButton1', 'greyButton2', 'Top Ten', 'Score');

    this.menuButton = new Button(this, config.width / 2, config.height / 2 + 100, 'greyButton1', 'greyButton2', 'Menu', 'Title');

    this.model = this.sys.game.globals.model;
    this.text = this.add.text(275, 30, 'GAME OVER', { fontSize: 44, fill: '000f' });
    this.text = this.add.text(260, 90, `Total Score: ${this.model.score}`, { fontSize: 44, fill: '#000' });
  }
}