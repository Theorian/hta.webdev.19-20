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


var config = {
  type: Phaser.WEBGL,
  backgroundColor: "#016",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,
    width: 320,
    height: 680
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver
  ],
  pixelArt: true,
  // roundPixels: true
};

var game = new Phaser.Game(config);