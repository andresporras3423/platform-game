import Phaser from 'phaser';
import ButtonWithCallback from '../Elements/Button';

const enterKey = (e) => {
  if (
    e.key === 'Enter'
  ) {
    return true;
  }
  return false;
};


const checkKeys = (e) => {
  if (
    e.key !== 'Backspace'
        && e.key !== 'Enter'
        && e.key !== 'Shift'
        && e.key !== 'Alt'
        && e.key !== 'Tab'
        && e.key !== 'Delete'
  ) {
    return true;
  }
  return false;
};

export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
    this.playerName = '';
  }

  preload() {
    this.model = this.sys.game.globals.model;
    this.model.playerName = '';
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.levelLabel = this.add.text(50, 50, 'INSTRUCTIONS', this.model.fontStyleTitle);
    this.levelLabel = this.add.text(
      30, 120,
      '1) Use the Enter key to avoid getting caught by cactus',
      this.model.fontStyleLabel,
    );
    this.levelLabel = this.add.text(
      30, 200,
      '2) You\'ll lose a life out of 3 when a cactus hit you',
      this.model.fontStyleLabel,
    );
    this.levelLabel = this.add.text(
      30, 240,
      'or when you fall out of the platforms!',
      this.model.fontStyleLabel,
    );

    this.nameLabel = this.add.text(300, 360, 'Enter your name:', this.model.fontStyleTitle);
    this.nameText = this.add.text(300, 390, ' ... ', this.model.fontStyleTitle);

    this.input.keyboard.on('keydown', (e) => {
      if (checkKeys(e)) {
        this.playerName += e.key;
        this.saveName(this.playerName);
        this.nameText.setText(this.playerName);
      } else if (e.key === 'Backspace' && this.playerName.length > 0) {
        this.playerName = this.playerName.slice(0, -1);
        this.saveName(this.playerName);
        this.nameText.setText(this.playerName);
      } else if (enterKey(e)) {
        this.saveName(this.playerName);
        this.scene.start('Game');
      }
    });

    this.menuButton = new ButtonWithCallback(this, 400, 500, 'greyButton1', 'greyButton2', 'Start!', 'Game', this.invokeSaving);
  }

  saveName(name) {
    if (name === '') {
      this.model.playerName = 'Anonymous';
    } else {
      this.model.playerName = name;
    }
  }

  invokeSaving() {
    this.saveName(this.playerName);
  }
}