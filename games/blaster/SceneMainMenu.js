class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image("sprBgMain", "assets/bg.png");
    this.load.image("sprBg0", "assets/sprBg0.png");
    this.load.image("sprBg1", "assets/sprBg1.png");
    this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
    this.load.image("sprBtnPlayHover", "assets/sprBtnPlayHover.png");
    this.load.image("sprBtnPlayDown", "assets/sprBtnPlayDown.png");
    this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
    this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
    this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");
    this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnPlay"
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on(
      "pointerover",
      function() {
        this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );

    this.btnPlay.on("pointerout", function() {
      this.setTexture("sprBtnPlay");
    });

    this.btnPlay.on(
      "pointerdown",
      function() {
        this.btnPlay.setTexture("sprBtnPlayDown");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnPlay.on(
      "pointerup",
      function() {
        this.btnPlay.setTexture("sprBtnPlay");
        this.scene.start("SceneMain");
      },
      this
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      "SPACE SAVIOUR",
      {
        fontFamily: "monospace",
        fontSize: 24,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center"
      }
    );
    this.title.setOrigin(0.5);

    this.backgrounds = [];
    for (var i = 0; i < 4; i++) {
      var keys = ["sprBgMain", "sprBg0", "sprBg1"];
      // var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, keys[i], (i+5) * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}
