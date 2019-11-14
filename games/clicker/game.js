import { MainScene } from './mainScene.js';
import { StartScene } from './startScene.js';

window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
      parent: 'gamediv',
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      zoom: 1,
      width: 640,
      height: 480
    },
    scene: [StartScene, MainScene],
    backgroundColor: "#000",
    physics: {
      default: "arcade"
    }
  };
  var game = new Phaser.Game(gameConfig);
  window.focus();

};


