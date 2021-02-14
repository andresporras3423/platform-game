import gameOptions from '../Options/gameOptions';

const webapi = (() => {
  const urls = {
    2: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/FVcIja5G7BvBg6ZEodVK/scores/',
    3: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Vd5SKbQfAzVOc48DZkxP/scores/',
  };
  const getScore = async () => {
    try {
      const response = await fetch(urls[gameOptions.jumps], {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const bestScores = data.result.sort((a, b) => b.score - a.score);
      return bestScores.slice(0, 10);
    } catch {
      return -1;
    }
  };

  const saveScore = async (name, score) => {
    try {
      const response = await fetch(urls[gameOptions.jumps], {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: name,
          score,
        }),
      });
      const data = await response.json();
      return data;
    } catch {
      return -1;
    }
  };

  return { getScore, saveScore };
})();

export default webapi;