export class StartScene extends Phaser.Scene {

  preload() {
    this.load.image("buttonBG", "startbg.png");
    // this.load.image("buttonText", "assets/sprites/button-text.png");
  }

  create() {
    var bg = this.add.image(0, 0, "buttonBG").setInteractive();
    // var text = this.add.image(0, 0, "buttonText");

    var container = this.add.container(400, 300, [bg,text]);

    bg.once("pointerup", this.scene.start('MainScene') , this);

    
  }

//   loadImage() {
//     this.load.once("complete", addSprites, this);

//     this.load.image("pic", "assets/pics/turkey-1985086.jpg");
//     this.load.image("titan", "assets/pics/titan-mech.png");

//     this.load.start();
//   }
}
