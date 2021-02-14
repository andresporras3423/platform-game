import Phaser from 'phaser';
import config from './Options/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import CreditsScene from './Scenes/CreditsScene';
import LevelScene from './Scenes/LevelScene';
import GameOverScene from './Scenes/GameOverScene';
import ScoreScene from './Scenes/ScoreScene';
import InstructionsScene from './Scenes/InstructionsScene';
import ModelService from './Services/model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new ModelService();
    this.globals = { model, bgMusic: null, bgMusicGame: null };
    this.scene.add('Level', LevelScene);
    this.scene.add('Score', ScoreScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Instructions', InstructionsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();