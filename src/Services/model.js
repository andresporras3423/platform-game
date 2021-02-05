/* eslint-disable no-underscore-dangle */
export default class model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusic = false;
    this._score = 0;
    this._playerName = 'Anon';
    this._fontStyleLabel = {};
    this._fontStyleTitle = {};
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusic(value) {
    this._bgMusic = value;
  }

  get bgMusic() {
    return this._bgMusic;
  }

  set score(value) {
    this._score = value;
  }

  get score() {
    return this._score;
  }

  set playerName(value) {
    this._playerName = value;
  }

  get playerName() {
    return this._playerName;
  }

  get fontStyleLabel() {
    this._fontStyleLabel = {
      fontSize: 22,
      fill: '#000',
    };
    return this._fontStyleLabel;
  }

  get fontStyleTitle() {
    this._fontStyleTitle = {
      fontSize: 26,
      fill: '#000',
    };
    return this._fontStyleTitle;
  }
}