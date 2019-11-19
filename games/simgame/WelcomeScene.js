export class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'WelcomeScene'
        })
    }
    preload() {
        console.log('WelcomeScene preload')
        this.load.image('background', 'assets/background.png')
        this.load.image('target', 'assets/i1.gif')
        this.load.image('wall', 'assets/i2.gif')
        this.load.spritesheet("box", "assets/trash.png", {
            frameWidth: 32,
            frameHeight: 32
          });
          this.load.spritesheet("box2", "assets/trash2.png", {
            frameWidth: 32,
            frameHeight: 32
          });
        this.load.image('player', 'assets/coon.gif')
        this.load.image('empty', 'assets/i7.gif')
        this.load.image('btn_enabled', 'assets/btn_enabled.png')
        this.load.image('btn_disabled', 'assets/btn_disabled.png')
        this.load.image('btn_rollover', 'assets/btn_rollover.png')
        
        this.load.json('textures', 'assets/tilemaps/sokoban.json')

        this.load.json('level0', 'assets/tilemaps/level0.json')
        this.load.json('level1', 'assets/tilemaps/level1.json')
        this.load.json('level2', 'assets/tilemaps/level2.json')
        this.load.json('level3', 'assets/tilemaps/level3.json')
    }

    create() {
        this.scene.start('level0')
    }
}
