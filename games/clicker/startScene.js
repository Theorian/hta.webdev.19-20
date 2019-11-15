// This scene is used to show the title of the game and a play button
// also we could include any credits and copy rights.
export class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  //Loading all the graphics Before the game starts.
  preload() {
    //Load background image
    this.load.image("startBG", "startbg.png");

    //Load button to start game
    this.load.image("buttonText", "play.png");
  }

  // Set everything up and lay everything out on the screen
  create() {
    var bg = this.add.image(0, 0, "startBG");
    var playbutton = this.add.image(0, 0, "buttonText").setInteractive();

    bg.scale = 3;
    playbutton.scale = 1;

    //Have the background an image to a container that is centered on the screen
    var container = this.add.container(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      [bg, playbutton]
    );

    //The mouse pointer is up on the play button close the scene and open the main scene
    playbutton.once(
      "pointerup",
      function() {
        this.scene.start("MainScene");
      },
      this
    );
  }
}
