// 
//  _______            _        ____        _   _                
// |__   __|          | |      / __ \      | | | |               
//    | |_ __ __ _ ___| |__   | |  | |_   _| |_| | __ ___      __
//    | | '__/ _` / __| '_ \  | |  | | | | | __| |/ _` \ \ /\ / /
//    | | | | (_| \__ \ | | | | |__| | |_| | |_| | (_| |\ V  V / 
//    |_|_|  \__,_|___/_| |_|  \____/ \__,_|\__|_|\__,_| \_/\_/  
// 

import { WelcomeScene } from './WelcomeScene.js'
import { SokobanScene } from './SokobanScene.js'

const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      zoom: 1,
      width: 375,
      height: 812
    },
    scene: [
        new WelcomeScene(),
        new SokobanScene('level0', 'level1'),
        new SokobanScene('level1', 'level2'),
        new SokobanScene('level2', 'level3'),
        new SokobanScene('level3', null)
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

const game = new Phaser.Game(config)
game.TILESIZE = 36
game.INDENT = 150