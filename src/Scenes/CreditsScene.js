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
    this.area = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '36px', fill: '#000' });
    this.madeByText = this.add.text(0, 0, 'Created By: Oscar Andrés Russi Porras', { fontSize: '24px', fill: '#000' });
    this.emailText = this.add.text(0, 0, 'Email: oscarrussi@outlook.com', { fontSize: '24px', fill: '#000' });
    this.linkedinText = this.add.text(0, 0, 'LinkedIn: linkedin.com/in/oscar-andres-russi-porras/', { fontSize: '24px', fill: '#000' });
    this.portfolioText = this.add.text(0, 0, 'Portfolio: andresporras3423.github.io/my-portfolio/', { fontSize: '24px', fill: '#000' });

    let elements = [this.creditsText, this.madeByText, this.emailText, this.linkedinText, this.portfolioText];
    this.madeByTween;
    this.emailTween; 
    this.linkedinTween;
    this.portfolioTween;
    let tweenElements= [null, this.madeByTween, this.emailTween, this.linkedinTween, this.portfolioTween];

    for(let i=0; i<5; i+=1){
      Phaser.Display.Align.In.Center(
        elements[i],
        this.area,
      );
      for(let j=0; j<5; j+=1){
        if(j>0) {
          elements[j].setY(400+(j*200));
        }
      }
      for(let k = 0; k<5; k++){
        if(k>0) {
          tweenElements[k] = this.tweens.add({
          targets: elements[k],
          y: -900+(k*200),
          ease: 'Power1',
          duration: 8000,
          delay: 500*k,
          onComplete: function () {
          tweenElements[k].destroy;
          this.scene.start('Title');
          }.bind(this),
      });
        }
        else{
          this.tweens.add({
          targets: elements[k],
          y: -900+(k*200),
          ease: 'Power1',
          duration: 8000,
          delay: 500*k,
          onComplete() {
            this.destroy;
          },
        });
        }
      }
    }
  }
}