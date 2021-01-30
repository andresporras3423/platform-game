/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import config from '../Options/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#000' });
    this.madeByText = this.add.text(0, 0, 'Created By: Oscar Andrés Russi Porras', { fontSize: '24px', fill: '#000' });
    this.emailText = this.add.text(0, 0, 'Email: oscarrussi@outlook.com', { fontSize: '24px', fill: '#000' });
    this.linkedinText = this.add.text(0, 0, 'LinkedIn: linkedin.com/in/oscar-andres-russi-porras/', { fontSize: '24px', fill: '#000' });
    this.portfolioText = this.add.text(0, 0, 'Portfolio: andresporras3423.github.io/my-portfolio/', { fontSize: '24px', fill: '#000' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.emailText,
      this.zone,
    );

    this.madeByText.setY(600);
    this.emailText.setY(900);
    this.linkedinText.setY(1200);
    this.portfolioText.setY(1500);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
      }.bind(this),
    });

    this.emailTween = this.tweens.add({
      targets: this.emailText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.emailTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });

    this.linkedinTween = this.tweens.add({
      targets: this.linkedinText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.emailTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });

    this.portfolioTween = this.tweens.add({
      targets: this.portfolioText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.emailTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}