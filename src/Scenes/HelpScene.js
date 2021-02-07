import Phaser from 'phaser';
import Button from '../Elements/Button';
import gameOptions from '../Options/gameOptions';

export default class HelpScene extends Phaser.Scene {
  constructor() {
    super('Help');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(200, 100, 'Select difficulty', { fontSize: 40, fill: '#000' });
    this.doubleJumpRadio = this.add.image(200, 200, 'radioButtonBlank');
    this.doubleJumpText = this.add.text(250, 190, 'Double Jump (hard mode)', { fontSize: 24, fill: '#000' });
    this.tripleJumpRadio = this.add.image(200, 300, 'radioButtonBlank');
    this.tripleJumpText = this.add.text(250, 290, 'Triple Jump (easy mode)', { fontSize: 24, fill: '#000' });

    this.doubleJumpRadio.setInteractive();
    this.tripleJumpRadio.setInteractive();

    this.updateJumpValue = () => {
      if (gameOptions.jumps === 3) {
        gameOptions.jumps = 2;
      } else {
        gameOptions.jumps = 3;
      }
    };

    const that = this;
    this.doubleJumpRadio.on('pointerdown', () => {
      that.updateJumpValue();
      that.updateJumpRadio();
    });

    this.tripleJumpRadio.on('pointerdown', () => {
      that.updateJumpValue();
      that.updateJumpRadio();
    });
    this.menuButton = new Button(this, 400, 500, 'greyButton1', 'greyButton2', 'Menu', 'Title');

    this.updateJumpRadio();
  }


  updateJumpRadio() {
    if (gameOptions.jumps === 2) {
      this.doubleJumpRadio.setTexture('radioButtonCheck');
      this.tripleJumpRadio.setTexture('radioButtonBlank');
    } else {
      this.doubleJumpRadio.setTexture('radioButtonBlank');
      this.tripleJumpRadio.setTexture('radioButtonCheck');
    }
  }
}