window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: "#000",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);
};

var bullets;
var ship;
var speed;
var stats;
var cursors;
var lastFired = 0;

function preload() {
  this.load.image("ship", "ship.png");
  this.load.image("bullet", "bullet.png");
}

function create() {
  var Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize: function Bullet(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, "bullet");

      this.speed = Phaser.Math.GetSpeed(800, 1);
    },

    fire: function(x, y) {
      this.setPosition(x, y - 50);

      this.setActive(true);
      this.setVisible(true);
    },

    update: function(time, delta) {
      this.y -= this.speed * delta;

      if (this.y < -50) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  });

  bullets = this.add.group({
    classType: Bullet,
    maxSize: 30,
    runChildUpdate: true
  });

  ship = this.physics.add.sprite(400, 500, "ship").setDepth(1);

  ship.body.setCollideWorldBounds();

  cursors = this.input.keyboard.createCursorKeys();

  speed = Phaser.Math.GetSpeed(500, 1);
}

function update(time, delta) {
  if (cursors.left.isDown) {
    ship.x -= speed * delta;
  }
  if (cursors.right.isDown) {
    ship.x += speed * delta;
  }
  if (cursors.up.isDown) {
    ship.y -= speed * delta;
  }
  if (cursors.down.isDown) {
    ship.y += speed * delta;
  }

  if (cursors.space.isDown && time > lastFired) {
    var bullet = bullets.get();

    if (bullet) {
      bullet.fire(ship.x, ship.y);

      lastFired = time + 50;
    }
  }

  // if (cursors.up.isDown && time > lastFired)
  // {
  //     var bullet = bullets.get();

  //     if (bullet)
  //     {
  //         bullet.fire(ship.x, ship.y);

  //         lastFired = time + 50;
  //     }
  // }
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