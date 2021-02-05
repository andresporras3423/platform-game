import { GameSetup } from '../src/Services/gamesetup';

describe('Game initial setup', () => {
  it('The player has 3 lives', () => {
    GameSetup.newGame();
    expect(GameSetup.currentLives()).toBe(3);
  });

  it('Score is zero', () => {
    GameSetup.newGame();
    expect(GameSetup.currentScore()).not.toBeGreaterThanOrEqual(1);
  });
});

describe('change values', () => {
  it('Score is incremented by 25 when no value is defined', () => {
    GameSetup.newGame();
    GameSetup.scoreUp();
    expect(GameSetup.currentScore()).toBe(25);
  });

  it('Score is incremented by the defined value', () => {
    GameSetup.newGame();
    GameSetup.scoreUp(100);
    expect(GameSetup.currentScore()).toBe(100);
  });

  it('Does not increment value when defined is null', () => {
    GameSetup.newGame();
    GameSetup.scoreUp(null);
    expect(GameSetup.currentScore()).toBe(0);
  });

  it('Does not increment negative values', () => {
    GameSetup.newGame();
    GameSetup.scoreUp(-852);
    expect(GameSetup.currentScore()).toBe(0);
  });

  it('Lives are decremented by one', () => {
    GameSetup.newGame();
    GameSetup.liveDown();
    expect(GameSetup.currentLives()).toBe(2);
  });

  it('Decrements lives until its value is zero', () => {
    GameSetup.newGame();
    GameSetup.liveDown();
    GameSetup.liveDown();
    GameSetup.liveDown();
    GameSetup.liveDown();
    GameSetup.liveDown();
    expect(GameSetup.currentLives()).toBe(0);
  });
});

describe('Restart Game', () => {
  it('Score value is zero after calling newGame', () => {
    GameSetup.newGame();
    GameSetup.liveDown();
    GameSetup.liveDown();
    GameSetup.scoreUp();
    GameSetup.scoreUp();
    GameSetup.newGame();
    expect(GameSetup.currentScore()).toBe(0);
  });
  it('Lives value is 3 after calling newGame', () => {
    GameSetup.newGame();
    GameSetup.liveDown();
    GameSetup.liveDown();
    GameSetup.scoreUp();
    GameSetup.scoreUp();
    GameSetup.newGame();
    expect(GameSetup.currentLives()).toBe(3);
  });
});