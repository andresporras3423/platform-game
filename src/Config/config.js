import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
  // physics settings
  physics: {
    default: 'arcade',
  },
};