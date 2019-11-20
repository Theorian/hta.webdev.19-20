
//   __  __                 _               _____ _ _      _             
//  |  \/  |               | |             / ____| (_)    | |            
//  | \  / | ___  _ __  ___| |_ ___ _ __  | |    | |_  ___| | _____ _ __ 
//  | |\/| |/ _ \| '_ \/ __| __/ _ \ '__| | |    | | |/ __| |/ / _ \ '__|
//  | |  | | (_) | | | \__ \ ||  __/ |    | |____| | | (__|   <  __/ |   
//  |_|  |_|\___/|_| |_|___/\__\___|_|     \_____|_|_|\___|_|\_\___|_|  
// 

import { MainScene } from './mainScene.js';
import { StartScene } from './startScene.js';

window.onload = function() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
      parent: 'gamediv',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      zoom: 1,
      width: 375,
      height: 812
    },
    scene: [MainScene],
    backgroundColor: "#000",
    physics: {
      default: "arcade"
    }
  };
  var game = new Phaser.Game(gameConfig);
  window.focus();

};


