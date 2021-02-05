const gameOptions = {
  // platform speed range, in pixels per second
  platformSpeedRange: [300, 300],
  // clouds speed, in pixels per second
  cloudSpeed: 80,
  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [100, 150],
  // platform width range, in pixels
  platformSizeRange: [150, 300],
  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-3, 3],
  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 20,
  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],
  // player gravity
  playerGravity: 1500,
  // player jump force
  jumpForce: 350,
  // player starting X position
  playerStartPosition: 300,
  // consecutive jumps allowed
  jumps: 3,
  // % of probability a coin appears on the platform
  meatPercent: 25,
  // % of probability a fire appears on the platform
  cactusPercent: 50,
};

export default gameOptions;