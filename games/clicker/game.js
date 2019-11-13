import { MainScene } from './mainScene.js';

window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.AUTO,
    width: 680,
    height: 480,
    scene: MainScene,
    backgroundColor: "#000",
    pixelArt: true,
    physics: {
      default: "arcade"
    }
  };
  game = new Phaser.Game(gameConfig);
  window.focus();

};

