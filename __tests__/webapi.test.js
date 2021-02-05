import webapi from '../src/Services/webapi';

test('get top ten records from getScore service', () => {
  webapi.getScore()
    .then((response) => {
      expect(response.length).toEqual(10);
    });
});

test('should not get an string from  getScore service', () => {
  webapi.getScore()
    .then((response) => {
      expect(response).not.toAnInstanceOf(String);
    });
});

test('expect getScore to return an array', () => {
  webapi.getScore()
    .then((response) => {
      expect(response[0]).toEqual(expect.objectContaining({
        score: expect.any(Number),
        name: expect.any(String),
      }));
    });
});

test('expect getScore to not bring score in ascending order', () => {
  webapi.getScore()
    .then((response) => {
      expect(response).not.toEqual(expect.arrayContaining(response.sort((a, b) =>  a.score- b.score)));
    });
});

test('expect saveScore returns a successfull message', () => {
  webapi.saveScore('Oscar', 10)
    .then((response) => {
      expect(response).resolves.toBe('Leaderboard score created correctly.');
    });
});

test('expect saveScore dont returns a successful message when name is empty', () => {
  webapi.saveScore('', 10)
    .then((response) => {
      expect(response).resolves.not.toBe('Leaderboard score created correctly.');
    });
});

test('expect saveScore successful even if score is 0', () => {
  webapi.saveScore('Andres', 0)
    .then((response) => {
      expect(response).resolves.not.toBe('Leaderboard score created correctly.');
    });
});

test('expect saveScore fail if name is null', () => {
  webapi.saveScore(null, 10)
    .then((response) => {
      expect(response).resolves.toBe('Leaderboard score created correctly.');
    });
});

test('expect saveScore fail if score is null is null', () => {
  webapi.saveScore("oscar", null)
    .then((response) => {
      expect(response).resolves.not.toBe('Leaderboard score created correctly.');
    });
});