import Phaser from 'phaser';
import Button from '../Elements/Button';

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
    this.levelLabel = this.add.text(50, 50, 'INSTRUCTIONS', this.model.fontTitle);
    this.levelLabel = this.add.text(
      30, 120,
      '1) Use the Enter key to avoid getting caught by cactus',
      this.model.fontLabel,
    );
    this.levelLabel = this.add.text(
      30, 160,
      '2) You\'ll lose a life out of 3 when a cactus hit you',
      this.model.fontLabel,
    );
    this.levelLabel = this.add.text(
      30, 180,
      'or when you fall out of the platforms!',
      this.model.fontLabel,
    );

    this.nameLabel = this.add.text(300, 300, 'Enter your name:', this.model.fontTitle);
    this.nameText = this.add.text(300, 330, ' ... ', this.model.fontTitle);

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

    this.startButton = new Button(this, 400, 400, 'greyButton1', 'greyButton2', 'Start!', 'Game', this.invokeSaving);
    this.menuButton = new Button(this, 400, 480, 'greyButton1', 'greyButton2', 'Menu', 'Title');
  }

  saveName(name) {
    if (name === '') {
      this.model.playerName = 'Anon';
    } else {
      this.model.playerName = name;
    }
  }

  invokeSaving() {
    this.saveName(this.playerName);
  }
}