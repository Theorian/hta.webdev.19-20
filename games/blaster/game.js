window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: "#000",
    pixelArt: true,
    scale: {
      parent: 'gamediv',
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      zoom: 1,
      width: 640,
      height: 480
    },
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

};

var Bullet;
var Ship;
var speed;
var stats;
var cursors;
var lastFired = 10;

function preload() {
  this.load.image("Ship", "assets/HeroShip.png");
  this.load.image("Bullet", "assets/Ammunition.png");
  this.load.image("background", "assets/Background.png");
  this.load.image("bullet", "assets/EnemyshipAmmunition.png");
  this.load.image("Dead", "assets/HeroDeath.png");
  this.load.image("badship", "assets/enemy.png");
  this.load.image("dead", "assets/EnemyshipDeath.png");
}

this.anims.create({
    key: "jump",
    frames: this.anims.generateFrameNumbers("Ship", { start: 0, end: 6 }),
    frameRate: 14,
    repeat: -1
  });

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("Ship", { start: 1, end: 1 }),
    frameRate: 1,
    repeat: -1
  });
}

function create() {
  var Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize: function Bullet(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, "Bullet");

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

  Bullets = this.add.group({
    classType: Bullet,
    maxSize: 10,
    runChildUpdate: true
  });

  Ship = this.physics.add.sprite(400, 500, "ship").setDepth(1);

  Ship.body.setCollideWorldBounds();

  cursors = this.input.keyboard.createCursorKeys();

  speed = Phaser.Math.GetSpeed(500, 1);
}

function update(time, delta) {
  if (cursors.left.isDown) {
    Ship.x -= speed * delta;
  }
  if (cursors.right.isDown) {
    Ship.x += speed * delta;
  }
  if (cursors.up.isDown) {
    Ship.y -= speed * delta;
  }
  if (cursors.down.isDown) {
    Ship.y += speed * delta;
  }

  if (cursors.space.isDown && time > lastFired) {
    var Bullet = Bullets.get();

    if (bullet) {
      Bullet.fire(Ship.x, Ship.y);

      lastFired = time + 10;
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


