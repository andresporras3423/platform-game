import Model from '../src/Services/model';

test('sound is on when the game start', () => {
  const myModel = new Model();
  expect(myModel.soundOn).toEqual(true);
});

test('update sound value', () => {
  const myModel = new Model();
  myModel.soundOn = false;
  expect(myModel.soundOn).toEqual(false);
});

test('bgMusic can be set update to true', () => {
  const myModel = new Model();
  myModel.bgMusic = true;
  expect(myModel.bgMusic).toEqual(true);
});

test('bgMusic is off when the game start', () => {
  const myModel = new Model();
  expect(myModel.bgMusic).toEqual(false);
});

test('score is zero when the game start', () => {
  const myModel = new Model();
  expect(myModel.score).toEqual(0);
});

test('score value can be updated', () => {
  const myModel = new Model();
  myModel.score = 25;
  expect(myModel.score).not.toEqual(0);
});

test('playerName is equal to Anon when the game start', () => {
  const myModel = new Model();
  expect(myModel.playerName).toEqual('Anon');
});

test('playerName can be updated', () => {
  const myModel = new Model();
  myModel.playerName = 'Oscar';
  expect(myModel.playerName).not.toEqual('Anon');
});

test('fontTitle has the initial properties', () => {
  const myModel = new Model();
  expect(myModel.fontTitle).toMatchObject({ fontSize: 26, fill: '#000' });
});

test('fontLabel has the initial properties, fontsize is not 26', () => {
  const myModel = new Model();
  expect(myModel.fontLabel).not.toMatchObject({ fontSize: 26, fill: '#000' });
});

test('fontTitle atrribute fontSize contains a number', () => {
  const myModel = new Model();
  expect(myModel.fontTitle).toEqual(expect.objectContaining({ fontSize: expect.any(Number) }));
});

test('fontLabel attribute fontSize does not contain a string', () => {
  const myModel = new Model();
  expect(myModel.fontLabel).not.toEqual(expect.objectContaining({ fontSize: expect.any(String) }));
});

test('music is on when the game start', () => {
  const myModel = new Model();
  expect(myModel.musicOn).toEqual(true);
});

test('music can be update to false', () => {
  const myModel = new Model();
  myModel.musicOn = false;
  expect(myModel.musicOn).toEqual(false);
});