const gameOptions = {
  // a height range between current platform and next platform
  platformHeightRange: [-3, 3],
  // height scales for the platform
  platformHeighScale: 20,
  // Using screen height ratio, define platform max and min height
  platformVerticalLimit: [0.4, 0.8],
  // speed of platforms by pixels per second
  platformSpeedRange: [300, 300],
  // clouds speed, in pixels per second
  cloudSpeed: 80,
  // horizontal distance between current platform and the next
  spawnRange: [100, 150],
  // range of platform width, in pixels
  platformSizeRange: [200, 300],
  // gravity for the player
  playerGravity: 1500,
  // height of player jump
  jumpForce: 400,
  // initial player position on the X axis
  playerStartPosition: 300,
  // consecutive jumps possible
  jumps: 3,
  // probability (%) of a meat appears on each platform
  meatPercent: 25,
  // probability (%) of a cactus appears on the platform
  cactusPercent: 100,
};

export default gameOptions;