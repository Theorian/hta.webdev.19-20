var game;

var gameOptions = {
  tileSize: 40,
  gameWidth: 320,
  gameHeight: 660,
  gameSpeed: 100,
  doubleTapDelay: 300
};

var level = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 4, 2, 1, 3, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
];

var EMPTY = 0;
var WALL = 1;
var SPOT = 2;
var CRATE = 3;
var PLAYER = 4;

window.onload = function() {
  var gameConfig = {
    type: Phaser.CANVAS,
    scale: {
      parent: "gamediv",
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: gameOptions.gameWidth,
    height: gameOptions.gameHeight,
    scene: [playGame],
    pixelArt: true
  };
  game = new Phaser.Game(gameConfig);
};

var playGame = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function playGame() {
    Phaser.Scene.call(this, { key: "PlayGame" });
  },
  preload: function() {
    this.load.spritesheet("tiles", "tiles.png", {
      frameWidth: gameOptions.tileSize,
      frameHeight: gameOptions.tileSize
    });
  },
  create: function() {
    this.undoArray = [];
    this.cratesGroup = this.add.group();
    this.drawLevel(false);
    this.input.on("pointerup", this.endSwipe, this);
    this.tapTime = 0;
    this.input.on("pointerdown", this.checkTap, this);
  },
  drawLevel: function(doingUndo) {
    var cratesPlaced = 0;
    this.crates = [];
    this.crates.length = 0;
    for (var i = 0; i < level.length; i++) {
      this.crates[i] = [];
      for (var j = 0; j < level[i].length; j++) {
        this.crates[i][j] = null;
        switch (level[i][j]) {
          case PLAYER:
          case PLAYER + SPOT:
            if (!doingUndo) {
              this.player = this.add.sprite(
                gameOptions.tileSize * j,
                gameOptions.tileSize * i,
                "tiles",
                level[i][j]
              );
              this.player.depth = 1;
              this.player.setOrigin(0);
              var tile = this.add.sprite(
                gameOptions.tileSize * j,
                gameOptions.tileSize * i,
                "tiles",
                level[i][j] - PLAYER
              );
              tile.setOrigin(0);
            } else {
              this.player.x = gameOptions.tileSize * j;
              this.player.y = gameOptions.tileSize * i;
              this.player.setFrame(level[i][j]);
            }
            this.player.posX = j;
            this.player.posY = i;
            break;
          case CRATE:
          case CRATE + SPOT:
            if (!doingUndo) {
              this.crates[i][j] = this.add.sprite(
                gameOptions.tileSize * j,
                gameOptions.tileSize * i,
                "tiles",
                level[i][j]
              );
              this.crates[i][j].setOrigin(0);
              this.crates[i][j].depth = 1;
              this.cratesGroup.add(this.crates[i][j]);
              var tile = this.add.sprite(
                gameOptions.tileSize * j,
                gameOptions.tileSize * i,
                "tiles",
                level[i][j] - CRATE
              );
              tile.setOrigin(0);
            } else {
              this.crates[i][j] = this.cratesGroup.children.entries[
                cratesPlaced
              ];
              this.crates[i][j].x = gameOptions.tileSize * j;
              this.crates[i][j].y = gameOptions.tileSize * i;
              this.crates[i][j].setFrame(level[i][j]);
              cratesPlaced++;
            }
            break;
          default:
            if (!doingUndo) {
              var tile = this.add.sprite(
                gameOptions.tileSize * j,
                gameOptions.tileSize * i,
                "tiles",
                level[i][j]
              );
              tile.setOrigin(0);
            }
        }
      }
    }
  },
  checkTap: function(e) {
    if (e.downTime - this.tapTime < gameOptions.doubleTapDelay) {
      if (this.undoArray.length > 0) {
        var undoLevel = this.undoArray.pop();
        level = [];
        level = this.copyArray(undoLevel);
        this.drawLevel(true);
        this.cameras.main.flash(400);
      }
    }
    this.tapTime = e.downTime;
  },
  endSwipe: function(e) {
    var swipeTime = e.upTime - e.downTime;
    var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
    var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
    var swipeNormal = new Phaser.Geom.Point(
      swipe.x / swipeMagnitude,
      swipe.y / swipeMagnitude
    );
    if (
      swipeMagnitude > 20 &&
      swipeTime < 1000 &&
      (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)
    ) {
      if (swipeNormal.x > 0.8) {
        this.checkMove(1, 0);
      }
      if (swipeNormal.x < -0.8) {
        this.checkMove(-1, 0);
      }
      if (swipeNormal.y > 0.8) {
        this.checkMove(0, 1);
      }
      if (swipeNormal.y < -0.8) {
        this.checkMove(0, -1);
      }
    }
  },
  checkMove: function(deltaX, deltaY) {
    if (this.isWalkable(this.player.posX + deltaX, this.player.posY + deltaY)) {
      this.undoArray.push(this.copyArray(level));
      this.movePlayer(deltaX, deltaY);
      return;
    }
    if (this.isCrate(this.player.posX + deltaX, this.player.posY + deltaY)) {
      if (
        this.isWalkable(
          this.player.posX + 2 * deltaX,
          this.player.posY + 2 * deltaY
        )
      ) {
        this.undoArray.push(this.copyArray(level));
        this.moveCrate(deltaX, deltaY);
        this.movePlayer(deltaX, deltaY);
        return;
      }
    }
  },
  isWalkable: function(posX, posY) {
    return level[posY][posX] == EMPTY || level[posY][posX] == SPOT;
  },
  isCrate: function(posX, posY) {
    return level[posY][posX] == CRATE || level[posY][posX] == CRATE + SPOT;
  },
  movePlayer: function(deltaX, deltaY) {
    var playerTween = this.tweens.add({
      targets: this.player,
      x: this.player.x + deltaX * gameOptions.tileSize,
      y: this.player.y + deltaY * gameOptions.tileSize,
      duration: gameOptions.gameSpeed,
      onComplete: function(tween, target, player) {
        player.setFrame(level[player.posY][player.posX]);
      },
      onCompleteParams: [this.player]
    });
    level[this.player.posY][this.player.posX] -= PLAYER;
    this.player.posX += deltaX;
    this.player.posY += deltaY;
    level[this.player.posY][this.player.posX] += PLAYER;
  },
  moveCrate: function(deltaX, deltaY) {
    var crateTween = this.tweens.add({
      targets: this.crates[this.player.posY + deltaY][
        this.player.posX + deltaX
      ],
      x:
        this.crates[this.player.posY + deltaY][this.player.posX + deltaX].x +
        deltaX * gameOptions.tileSize,
      y:
        this.crates[this.player.posY + deltaY][this.player.posX + deltaX].y +
        deltaY * gameOptions.tileSize,
      duration: gameOptions.gameSpeed,
      onComplete: function(tween, target, crate, player) {
        crate.setFrame(level[player.posY + deltaY][player.posX + deltaX]);
      },
      onCompleteParams: [
        this.crates[this.player.posY + deltaY][this.player.posX + deltaX],
        this.player
      ]
    });
    this.crates[this.player.posY + 2 * deltaY][
      this.player.posX + 2 * deltaX
    ] = this.crates[this.player.posY + deltaY][this.player.posX + deltaX];
    this.crates[this.player.posY + deltaY][this.player.posX + deltaX] = null;
    level[this.player.posY + deltaY][this.player.posX + deltaX] -= CRATE;
    level[this.player.posY + 2 * deltaY][
      this.player.posX + 2 * deltaX
    ] += CRATE;
  },
  copyArray: function(a) {
    var newArray = a.slice(0);
    for (var i = newArray.length; i > 0; i--) {
      if (newArray[i] instanceof Array) {
        newArray[i] = this.copyArray(newArray[i]);
      }
    }
    return newArray;
  }
});
