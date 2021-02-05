import webapi from '../src/Services/webapi';

test('expect get a promise from getScore service', () => {
  webapi.getScore()
    .then((response) => {
      expect(response).resolves.toBe('return a promise');
    });
});

test('expect we are getting only ten records from getScore service', () => {
  webapi.getScore()
    .then((response) => {
      expect(response.length).toEqual(10);
    });
});

test('expect we are getting an array from getScore service', () => {
  webapi.getScore()
    .then((response) => {
      expect(response).toAnInstanceOf(Array);
    });
});

test('expect getScore service returns array of objects', () => {
  webapi.getScore()
    .then((response) => {
      expect(response[0]).toEqual(expect.objectContaining({
        score: expect.any(Number),
        name: expect.any(String),
      }));
    });
});

test('expect getScore service returns sorted objects by score', () => {
  webapi.getScore()
    .then((response) => {
      expect(response).toEqual(expect.arrayContaining(response.sort((a, b) => b.score - a.score)));
    });
});

test('expect saveScore returns a successfull message', () => {
  webapi.saveScore('Oscar', 10)
    .then((response) => {
      expect(response).resolves.toBe('Leaderboard score created correctly.');
    });
});

test('expect saveScore dont returns a successfull message when name is empty', () => {
  webapi.saveScore('', 10)
    .then((response) => {
      expect(response).resolves.not.toBe('Leaderboard score created correctly.');
    });
});