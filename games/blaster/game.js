//
//   _____                         _____             _            
//  / ____|                       / ____|           (_)           
// | (___  _ __   __ _  ___ ___  | (___   __ ___   ___  ___  _ __ 
//  \___ \| '_ \ / _` |/ __/ _ \  \___ \ / _` \ \ / / |/ _ \| '__|
//  ____) | |_) | (_| | (_|  __/  ____) | (_| |\ V /| | (_) | |   
// |_____/| .__/ \__,_|\___\___| |_____/ \__,_| \_/ |_|\___/|_|   
//        | |                                                     
//        |_|      
// 

window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: "#ffffff",
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
var spaceTileMap;

function preload() {
  this.load.image("bullet", "assets/HeroAmmunition.png");
  this.load.image("background", "assets/bg.gif");
  this.load.image("bad", "assets/enemy.png");
  this.load.image("enemyBullet", "assets/EnemyAmmunition.png");
  this.load.image("dead", "assets/EnemyshipDeath.png");

    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet("ship", "assets/HeroShip.png", {
      frameWidth: 100,
      frameHeight: 100
    });
}

function create() {

  //Create the Starfield background
  spaceTileMap = this.add.tileSprite(1000, 1000, 2000, 2000, 'background');
  spaceTileMap.setTileScale(5,5);
  //Create the bullets from this class
  var Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize: function Bullet(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, "bullet");

      this.speed = Phaser.Math.GetSpeed(700, 1);
    },

    fire: function(x, y) {
      this.setPosition(x, y - 40);

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
    maxSize: 20,
    runChildUpdate: true
  });

  Ship = this.physics.add.sprite(400, 500, "ship").setDepth(1);

  Ship.body.setCollideWorldBounds();

  cursors = this.input.keyboard.createCursorKeys();

  speed = Phaser.Math.GetSpeed(500, 1);

  this.anims.create({
    key: "shipRockets",
    frames: this.anims.generateFrameNumbers("ship", {
      start: 0,
      end: 4
    }),
    frameRate: 8,
    repeat: -1
  });

  Ship.anims.play("shipRockets");

}

function update(time, delta) {

  
  spaceTileMap.tilePositionY -= 3; 
  
  if (cursors.left.isDown) {
    Ship.x -= speed * delta;
    spaceTileMap.tilePositionX -= 1; 
  }
  if (cursors.right.isDown) {
    Ship.x += speed * delta;
    spaceTileMap.tilePositionX += 1; 
  }
  if (cursors.up.isDown) {
    Ship.y -= speed * delta;
  }
  if (cursors.down.isDown) {
    Ship.y += speed * delta;
  }

  if (cursors.space.isDown && time > lastFired) {
    var Bullet = Bullets.get();

    if (Bullet) {
      Bullet.fire(Ship.x, Ship.y);

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


