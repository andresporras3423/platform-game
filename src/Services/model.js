export default class model {
  constructor() {
    this.p_soundOn = true;
    this.p_musicOn = true;
    this.p_bgMusic = false;
    this.p_score = 0;
    this.p_playerName = 'Anon';
    this.p_fontLabel = {};
    this.p_fontTitle = {};
  }

  set musicOn(value) {
    this.p_musicOn = value;
  }

  get musicOn() {
    return this.p_musicOn;
  }

  set soundOn(value) {
    this.p_soundOn = value;
  }

  get soundOn() {
    return this.p_soundOn;
  }

  set bgMusic(value) {
    this.p_bgMusic = value;
  }

  get bgMusic() {
    return this.p_bgMusic;
  }

  set score(value) {
    this.p_score = value;
  }

  get score() {
    return this.p_score;
  }

  set playerName(value) {
    this.p_playerName = value;
  }

  get playerName() {
    return this.p_playerName;
  }

  get fontLabel() {
    this.p_fontLabel = {
      fontSize: 22,
      fill: '#000',
    };
    return this.p_fontLabel;
  }

  get fontTitle() {
    this.p_fontTitle = {
      fontSize: 26,
      fill: '#000',
    };
    return this.p_fontTitle;
  }
}