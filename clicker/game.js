import { MainScene } from './scenes/mainScene.js';

window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.AUTO,
    width: 680,
    height: 480,
    scene: MainScene,
    backgroundColor: "#000",

    // physics settings
    physics: {
      default: "arcade"
    }
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);
};

