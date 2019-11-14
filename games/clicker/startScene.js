export class StartScene extends Phaser.Scene {
  constructor ()
  {
    super('StartScene');
  }

  preload() {
    this.load.image("startBG", "startbg.png");
    this.load.image("buttonText", "play.png");
  }

  create() {
    var bg = this.add.image(0, 0, "startBG");
    var text = this.add.image(0, 0, "buttonText").setInteractive();

    bg.scale = 3;
    text.scale = 1;
    var container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY, [bg, text]);

    text.once(
      "pointerup",
      function() {
        this.scene.start("MainScene");
      },
      this
    );
  }

  //   loadImage() {
  //     this.load.once("complete", addSprites, this);

  //     this.load.image("pic", "assets/pics/turkey-1985086.jpg");
  //     this.load.image("titan", "assets/pics/titan-mech.png");

  //     this.load.start();
  //   }
}
