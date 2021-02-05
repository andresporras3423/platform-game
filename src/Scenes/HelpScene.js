import Phaser from 'phaser';
import config from '../Options/config';
import Button from '../Elements/Button';

export default class HelpScene extends Phaser.Scene {
  constructor() {
    super('Help');
  }

  create() {
    this.menuButton = new Button(this, 400, 500, 'greyButton1', 'greyButton2', 'Menu', 'Title');
    this.text = this.add.text(config.width / 2 - 190, 120, '1) Press enter key to jump.\n2) You can make three consecutive jumps. \n3) catch the meats.', { fontSize: 24, fill: '#000' });
    this.text = this.add.text(config.width / 2 - 120, 40, 'How to play', { fontSize: 44, fill: '#000' });
  }
}