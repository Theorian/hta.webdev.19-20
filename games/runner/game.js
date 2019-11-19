//
// __          ___                  _____ _             ______ _       
// \ \        / / |                |  __ (_)           |  ____| |      
//  \ \  /\  / /| |__   ___ _ __   | |__) |  __ _ ___  | |__  | |_   _ 
//   \ \/  \/ / | '_ \ / _ \ '_ \  |  ___/ |/ _` / __| |  __| | | | | |
//    \  /\  /  | | | |  __/ | | | | |   | | (_| \__ \ | |    | | |_| |
//     \/  \/   |_| |_|\___|_| |_| |_|   |_|\__, |___/ |_|    |_|\__, |
//                                           __/ |                __/ |
//                                          |___/                |___/ 
//


// init game variable for future reference
let game;

// global game options
let gameOptions = {
  // platform speed range, in pixels per second
  platformSpeedRange: [200, 400],

  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],

  // platform width range, in pixels
  platformSizeRange: [90, 300],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-10, 10],

  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 10,

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // player gravity
  playerGravity: 3000,

  // player jump force
  jumpForce: 1000,

  // player starting X position
  playerStartPosition: 60,

  // consecutive jumps allowed
  jumps: 3
};

window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    key: "PlayGame",
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      zoom: 1,
      width: 320,
      height: 660
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
      extend: {
        addPlatform: addPlatform,
        jump: jump
      }
    },
    backgroundColor: 0x87ceeb,

    // physics settings
    physics: {
      default: "arcade"
    }
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  // resize();
  // window.addEventListener("resize", resize, false);
};

function preload() {
  this.load.image("platform", "platform.png");

  // player is a sprite sheet made by 24x48 pixels
  this.load.spritesheet("player", "assets/pig.png", {
    frameWidth: 32,
    frameHeight: 32
  });
}

function create() {
  // group with all active platforms.
  this.platformGroup = this.add.group({
    // once a platform is removed, it's added to the pool
    removeCallback: function(platform) {
      platform.scene.platformPool.add(platform);
    }
  });

  // pool
  this.platformPool = this.add.group({
    // once a platform is removed from the pool, it's added to the active platforms group
    removeCallback: function(platform) {
      platform.scene.platformGroup.add(platform);
    }
  });

  // number of consecutive jumps made by the player
  this.playerJumps = 0;

  // adding a platform to the game, the arguments are platform width, x position and y position
  this.addPlatform(
    game.config.width,
    game.config.width / 2,
    game.config.height * gameOptions.platformVerticalLimit[1]
  );

  // adding the player;
  this.player = this.physics.add.sprite(
    gameOptions.playerStartPosition,
    game.config.height * 0.7,
    "player"
  );

  this.player.scale = 2;
  this.player.setGravityY(gameOptions.playerGravity);

  // setting player animation
  this.anims.create({
    key: "run",
    frames: this.anims.generateFrameNumbers("player", {
      start: 0,
      end: 1
    }),
    frameRate: 8,
    repeat: -1
  });

  // setting collisions between the player and the platform group
  this.physics.add.collider(
    this.player,
    this.platformGroup,
    function() {
      // play "run" animation if the player is on a platform
      if (this.player.anims.isPlaying) {
        this.player.anims.stop();
      }
    },
    null,
    this
  );

  // checking for input
  this.input.on("pointerdown", this.jump, this);
}

// the core of the script: platform are added from the pool or created on the fly
function addPlatform(platformWidth, posX, posY) {
  let platform;
  if (this.platformPool.getLength()) {
    platform = this.platformPool.getFirst();
    platform.x = posX;
    platform.active = true;
    platform.visible = true;
    this.platformPool.remove(platform);
  } else {
    platform = this.physics.add.sprite(posX, posY, "platform");
    platform.setImmovable(true);
    platform.setVelocityX(
      Phaser.Math.Between(
        gameOptions.platformSpeedRange[0],
        gameOptions.platformSpeedRange[1]
      ) * -1
    );
    this.platformGroup.add(platform);
  }
  platform.displayWidth = platformWidth;
  this.nextPlatformDistance = Phaser.Math.Between(
    gameOptions.spawnRange[0],
    gameOptions.spawnRange[1]
  );
}

// the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
function jump() {
  if (!this.player.anims.isPlaying) {
    this.player.anims.play("run");
  }
  if (
    this.player.body.touching.down ||
    (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
  ) {
    if (this.player.body.touching.down) {
      this.playerJumps = 0;
    }
    this.player.setVelocityY(gameOptions.jumpForce * -1);
    this.playerJumps++;


  }
}
function update() {
  // game over
  if (this.player.y > game.config.height) {
    this.scene.restart();
  }
  this.player.x = gameOptions.playerStartPosition;

  // recycling platforms
  let minDistance = game.config.width;
  let rightmostPlatformHeight = 0;
  this.platformGroup.getChildren().forEach(function(platform) {
    let platformDistance =
      game.config.width - platform.x - platform.displayWidth / 2;
    if (platformDistance < minDistance) {
      minDistance = platformDistance;
      rightmostPlatformHeight = platform.y;
    }
    if (platform.x < -platform.displayWidth / 2) {
      this.platformGroup.killAndHide(platform);
      this.platformGroup.remove(platform);
    }
  }, this);

  // adding new platforms
  if (minDistance > this.nextPlatformDistance) {
    let nextPlatformWidth = Phaser.Math.Between(
      gameOptions.platformSizeRange[0],
      gameOptions.platformSizeRange[1]
    );
    let platformRandomHeight =
      gameOptions.platformHeighScale *
      Phaser.Math.Between(
        gameOptions.platformHeightRange[0],
        gameOptions.platformHeightRange[1]
      );
    // console.log(rightmostPlatformHeight);
    let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
    let minPlatformHeight =
      game.config.height * gameOptions.platformVerticalLimit[0];
    let maxPlatformHeight =
      game.config.height * gameOptions.platformVerticalLimit[1];
    let nextPlatformHeight = Phaser.Math.Clamp(
      nextPlatformGap,
      minPlatformHeight,
      maxPlatformHeight
    );
    this.addPlatform(
      nextPlatformWidth,
      game.config.width + nextPlatformWidth / 2,
      nextPlatformHeight
    );
  }
}

function resize() {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}
