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
    expect(GameSetup.currentScore()).toBe(20);
  });

  it('Score doesnt stay in 0 after scoreUp is called', () => {
    GameSetup.newGame();
    GameSetup.scoreUp(100);
    expect(GameSetup.currentScore()).not.toBe(0);
  });

  it('Does not increment value when defined is null', () => {
    GameSetup.newGame();
    GameSetup.scoreUp(null);
    expect(GameSetup.currentScore()).toBe(0);
  });

  it('scoreup method does not consider negative values', () => {
    GameSetup.newGame();
    GameSetup.scoreUp(-200);
    expect(GameSetup.currentScore()).not.toBe(-200);
  });

  it('Lives are decremented by one', () => {
    GameSetup.newGame();
    GameSetup.liveDown();
    expect(GameSetup.currentLives()).toBe(2);
  });

  it('lives is not three after livedown', () => {
    GameSetup.newGame();
    GameSetup.liveDown();
    expect(GameSetup.currentLives()).not.toBe(3);
  });
});

describe('Restart Game', () => {
  it('Score is zero after newGame method is called', () => {
    GameSetup.newGame();
    GameSetup.liveDown();
    GameSetup.scoreUp();
    GameSetup.newGame();
    expect(GameSetup.currentScore()).toBe(0);
  });
  it('Lives value is not 2 if newGame method is called', () => {
    GameSetup.newGame();
    GameSetup.liveDown();
    GameSetup.scoreUp();
    GameSetup.newGame();
    expect(GameSetup.currentLives()).not.toBe(2);
  });
});