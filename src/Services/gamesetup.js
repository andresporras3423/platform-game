export const GameSetup = (() => {
  let lives = 3;
  let score = 0;

  const newGame = () => {
    lives = 3;
    score = 0;
  };

  const liveDown = () => {
    if (lives > 0) {
      lives -= 1;
    }
  };

  const scoreUp = (points = 20) => {
    if (points > 0) {
      score += points;
    }
  };

  const currentScore = () => score;

  const currentLives = () => lives;

  return {
    newGame,
    currentLives,
    scoreUp,
    currentScore,
    liveDown,
  };
})();

export default GameSetup;