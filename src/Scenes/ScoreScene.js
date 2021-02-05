import Phaser from 'phaser';
import Button from '../Elements/Button';
import webapi from '../Services/webapi';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    this.text = this.add.text(290, 20, 'Top Scorers', { fontSize: 40, fill: '#000' });
    this.menuButton = new Button(this, 400, 550, 'greyButton1', 'greyButton2', 'Menu', 'Title');
    let place = 100;
    webapi.getScore().then((scores) => {
      let i = 1;
      scores.forEach((element) => {
        this.text = this.add.text(480, place, `${element.score} pts`, { fontSize: 25, fill: '#000' });
        this.text = this.add.text(260, place, `${i}. ${element.user}`, { fontSize: 25, fill: '#000' });
        place += 30;
        i += 1;
      });
    });
  }
}