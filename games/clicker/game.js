import { MainScene } from './mainScene.js';
import { StartScene } from './startScene.js';

window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.AUTO,
    width: 680,
    height: 480,
    scene: StartScene,
    backgroundColor: "#000",
    pixelArt: true,
    physics: {
      default: "arcade"
    }
  };
  var game = new Phaser.Game(gameConfig);
  window.focus();

};

